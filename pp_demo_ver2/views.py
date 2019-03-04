from flask import Flask, render_template, redirect, request
from flask import Blueprint
from line_pay import LinePay
from models import db, db_url, Transactions
import datetime
import socket

LINE_PAY_URL = 'https://sandbox-api-pay.line.me'
LINE_PAY_CHANNEL_ID = '1645473427'
LINE_PAY_CHANNEL_SECRET = '123b3744d3200b5a9c9ded007c7b48e2'

app_name = 'pp_demo_ver2'

ip_host = socket.gethostbyname(socket.gethostname())
# app.logger.info("LINE_PAY_CONFIRM_URL ==>> " + LINE_PAY_CONFIRM_URL)
LINE_PAY_CONFIRM_URL = 'http://192.168.2.100:5000/' + app_name + '/pay/confirm'
# LINE_PAY_CONFIRM_URL = 'http://'+ ip_host +':5000/' + app_name + '/pay/confirm'
pay = LinePay(channel_id=LINE_PAY_CHANNEL_ID, channel_secret=LINE_PAY_CHANNEL_SECRET,
              line_pay_url=LINE_PAY_URL, confirm_url=LINE_PAY_CONFIRM_URL)


ver2 = Blueprint(app_name,
                  __name__,
                  url_prefix='/' + app_name,
                  template_folder='templates',
                  static_folder='static')

@ver2.route("/", methods=['GET'])
def top():
    return render_template(app_name + '/top.html')

@ver2.route("/pay/confirm", methods=['GET'])
def pay_confirm():
    transaction_id = request.args.get('transactionId')
    obj = Transactions.query.filter_by(transaction_id=transaction_id).one_or_none()
    if obj is None:
        raise Exception("Error: transaction_id not found.")

    response = pay.confirm_payments(transaction_id=transaction_id, amount=obj.amount, currency=obj.currency)
    print(response["returnCode"])
    print(response["returnMessage"])
    #
    db.session.query(Transactions).filter(Transactions.transaction_id == transaction_id).delete()
    db.session.commit()
    db.session.close()
    return render_template(app_name + '/payment_complete.html', price=int(obj.amount))



@ver2.route("/enter", methods=['GET'])
def onEnter():
    id = request.args.get('id')

    f = open(id + '.txt', 'w')
    now = datetime.datetime.now()
    n = now.strftime("%Y/%m/%d %H:%M:%S")
    f.write(n)
    f.close()

    return n # 駐車時刻を返す


@ver2.route("/exit", methods=['GET'])
def onExit():
    id = request.args.get('id')
    fee_input = request.args.get('price')
    # TODO: idから駐車時刻取得 (ファイル読み込み)

    amount = fee_input # UI側から渡された料金で上書き
    currency = "JPY"
    product_name = "駐車料金"

    (order_id, response) = pay.request_payments(product_name=product_name, amount=amount, currency=currency)
    print(response["returnCode"])
    print(response["returnMessage"])

    transaction_id = response["info"]["transactionId"]
    print(order_id, transaction_id, product_name, amount, currency)
    obj = Transactions(transaction_id=transaction_id, order_id=order_id,
                       product_name=product_name, amount=amount, currency=currency)
    db.session.add(obj)
    db.session.commit()
    db.session.close()
    redirect_url = response["info"]["paymentUrl"]["web"]
    return redirect(redirect_url)
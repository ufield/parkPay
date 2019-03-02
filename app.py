from flask import Flask, render_template, redirect, request
from flask import Blueprint
#from flask_httpauth import HTTPDigestAuth
from line_pay import LinePay
from models import db, db_url, Transactions
import socket
import datetime
from pp_demo_ver0.views import ver0

LINE_PAY_URL = 'https://sandbox-api-pay.line.me'
LINE_PAY_CHANNEL_ID = '1645473427'
LINE_PAY_CHANNEL_SECRET = '123b3744d3200b5a9c9ded007c7b48e2'
app = Flask(__name__)


# app.config['SECRET_KEY'] = 'secret key here'

ip_host = socket.gethostbyname(socket.gethostname())
# LINE_PAY_CONFIRM_URL = 'http://'+ ip_host +':5000/pay/confirm'
# app.logger.info("LINE_PAY_CONFIRM_URL ==>> " + LINE_PAY_CONFIRM_URL)
LINE_PAY_CONFIRM_URL = 'http://192.168.2.100:5000/pp_demo_ver0/pay/confirm'
pay = LinePay(channel_id=LINE_PAY_CHANNEL_ID, channel_secret=LINE_PAY_CHANNEL_SECRET,
              line_pay_url=LINE_PAY_URL, confirm_url=LINE_PAY_CONFIRM_URL)

# auth = HTTPDigestAuth()

# def pay_reserve(id, fee):
#     product_name = "駐車料金" # TODO: 駐車時間含められるとなおよい
#     amount = fee
#     currency = "JPY"
#
#     (order_id, response) = pay.request_payments(product_name=product_name, amount=amount, currency=currency)
#     print(response["returnCode"])
#     print(response["returnMessage"])
#
#     # transaction_id = response["info"]["transactionId"]
#     # print(order_id, transaction_id, product_name, amount, currency)
#     # obj = Transactions(transaction_id=transaction_id, order_id=order_id,
#     #                    product_name=product_name, amount=amount, currency=currency)
#     # db.session.add(obj)
#     # db.session.commit()
#     db.session.close()
#     redirect_url = response["info"]["paymentUrl"]["web"]
#     return redirect(redirect_url)

# users = {
#     "test": "s2YpJSWU"
# }


# @auth.get_password
# def get_pw(username):
#     if username in users:
#         return users.get(username)
#     return None


# @app.route("/", methods=['GET'])
# def index():
#     return render_template('index.html')


# @ver_0.route("/pp_demo_ver0", methods=['GET'])
# ver_0 = Blueprint('pp_demo_ver0',
#                   __name__,
#                   url_prefix='/pp_demo_ver0',
#                   template_folder='templates',
#                   static_folder='static')
#
# @ver_0.route("/", methods=['GET'])
# def top():
#     return render_template('top.html')
#     # return render_template('pp_demo_ver0/top.html')
#
# @ver_0.route("/pay/confirm", methods=['GET'])
# def pay_confirm():
#     transaction_id = request.args.get('transactionId')
#     obj = Transactions.query.filter_by(transaction_id=transaction_id).one_or_none()
#     if obj is None:
#         raise Exception("Error: transaction_id not found.")
#
#     response = pay.confirm_payments(transaction_id=transaction_id, amount=obj.amount, currency=obj.currency)
#     print(response["returnCode"])
#     print(response["returnMessage"])
#     #
#     db.session.query(Transactions).filter(Transactions.transaction_id == transaction_id).delete()
#     db.session.commit()
#     db.session.close()
#     return render_template('payment_complete.html', price=int(obj.amount))
#
#
#
#
# @ver_0.route("/enter", methods=['GET'])
# def onEnter():
#     id = request.args.get('id')
#
#     f = open(id + '.txt', 'w')
#     now = datetime.datetime.now()
#     n = now.strftime("%Y/%m/%d %H:%M:%S")
#     f.write(n)
#     f.close()
#
#     return n # 駐車時刻を返す
#
#
# @ver_0.route("/exit", methods=['GET'])
# def onExit():
#     id = request.args.get('id')
#     fee_input = request.args.get('price')
#     # TODO: idから駐車時刻取得 (ファイル読み込み)
#     app.logger.info("IDL ==>> " + id)

    # id = 1;
    # fee_input = 100;

    # ==================================
    # fin = open(id + '.txt', 'r')
    # line = fin.read()
    # fin.close()
    #
    # a = line.split(' ')[0]
    # b = line.split(' ')[1]
    #
    # year  = a.split('/')[0]
    # month = a.split('/')[1]
    # day   = a.split('/')[2]
    #
    # hour   = b.split(':')[0]
    # minute = b.split(':')[1]
    # second = b.split(':')[2]
    #
    # date1 = datetime.datetime(int(year), int(month), int(day), int(hour), int(minute), int(second))
    # date2 = datetime.datetime.now()
    # date_sub = date2 - date1
    # parking_time = date_sub.seconds


    # 現在時刻と比較して料金計算 -> 10 yen/second
    # rate   = 10
    # # second = 10
    # fee_tmp = rate * parking_time


    # 料金計算終了したら、
    # calculate_parking_fee
    # =============================
    # fee_input = 100
    # amount = fee_tmp

    # amount = fee_input # UI側から渡された料金で上書き
    # currency = "JPY"
    # product_name = "駐車料金" # TODO: 駐車時間含められるとなおよい
    #
    #
    # (order_id, response) = pay.request_payments(product_name=product_name, amount=amount, currency=currency)
    # print(response["returnCode"])
    # print(response["returnMessage"])
    #
    # transaction_id = response["info"]["transactionId"]
    # print(order_id, transaction_id, product_name, amount, currency)
    # obj = Transactions(transaction_id=transaction_id, order_id=order_id,
    #                    product_name=product_name, amount=amount, currency=currency)
    # db.session.add(obj)
    # db.session.commit()
    # db.session.close()
    # redirect_url = response["info"]["paymentUrl"]["web"]
    # return redirect(redirect_url)

    # return pay_reserve(id, fee)

    # return id


# def pay_reserve_old():
#     product_name = "チョコレート"
#     amount = 1
#     currency = "JPY"
#
#     (order_id, response) = pay.request_payments(product_name=product_name, amount=amount, currency=currency)
#     print(response["returnCode"])
#     print(response["returnMessage"])
#
#     transaction_id = response["info"]["transactionId"]
#     print(order_id, transaction_id, product_name, amount, currency)
#     obj = Transactions(transaction_id=transaction_id, order_id=order_id,
#                        product_name=product_name, amount=amount, currency=currency)
#     db.session.add(obj)
#     db.session.commit()
#     db.session.close()
#     redirect_url = response["info"]["paymentUrl"]["web"]
#     return redirect(redirect_url)



# @app.route("/pay/reserve", methods=['POST'])
# def pay_reserve():
#     product_name = "チョコレート"
#     amount = 1
#     currency = "JPY"
#
#     (order_id, response) = pay.request_payments(product_name=product_name, amount=amount, currency=currency)
#     print(response["returnCode"])
#     print(response["returnMessage"])
#
#     transaction_id = response["info"]["transactionId"]
#     print(order_id, transaction_id, product_name, amount, currency)
#     obj = Transactions(transaction_id=transaction_id, order_id=order_id,
#                        product_name=product_name, amount=amount, currency=currency)
#     db.session.add(obj)
#     db.session.commit()
#     db.session.close()
#     redirect_url = response["info"]["paymentUrl"]["web"]
#     return redirect(redirect_url)


app.register_blueprint(ver0, url_prefix='/pp_demo_ver0')


def initialize_app(app) -> None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['DEBUG'] = True
    db.init_app(app)
    db.create_all(app=app)


def main() -> None:
    initialize_app(app)
    app.run(host='0.0.0.0', port=5000, threaded=True)
    # app.run(host='0.0.0.0', port=5000, threaded=True)


if __name__ == '__main__':
    main()

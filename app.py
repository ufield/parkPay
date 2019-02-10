from flask import Flask, render_template, redirect, request
from line_pay import LinePay
from models import db, db_url, Transactions
import socket



LINE_PAY_URL = 'https://sandbox-api-pay.line.me'
LINE_PAY_CHANNEL_ID = '1645473427'
LINE_PAY_CHANNEL_SECRET = '123b3744d3200b5a9c9ded007c7b48e2'
app = Flask(__name__)

ip_host = socket.gethostbyname(socket.gethostname())
# LINE_PAY_CONFIRM_URL = 'http://localhost:5000/pay/confirm'
# LINE_PAY_CONFIRM_URL = 'http://localhost:5000/pay/confirm'
LINE_PAY_CONFIRM_URL = 'http://'+ ip_host +':5000/pay/confirm'
app.logger.info("LINE_PAY_CONFIRM_URL ==>> " + LINE_PAY_CONFIRM_URL)
pay = LinePay(channel_id=LINE_PAY_CHANNEL_ID, channel_secret=LINE_PAY_CHANNEL_SECRET,
              line_pay_url=LINE_PAY_URL, confirm_url=LINE_PAY_CONFIRM_URL)



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

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@app.route("/enter", methods=['GET'])
def onEnter():
    id = request.args.get('id')
    # TODO: idと駐車時刻のひもづけ (ファイル出力)

    return id

@app.route("/exit", methods=['GET'])
def onExit():
    id = request.args.get('id')
    fee_input = request.args.get('price')
    # TODO: idから駐車時刻取得 (ファイル読み込み)


    # 現在時刻と比較して料金計算 -> 10 yen/second
    rate   = 10
    second = 10
    fee_tmp = rate * second

    # 料金計算終了したら、
    # calculate_parking_fee





    # =============================
    # fee_input = 100

    amount = fee_input # UI側から渡された料金で上書き
    currency = "JPY"
    product_name = "駐車料金" # TODO: 駐車時間含められるとなおよい


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


@app.route("/pay/confirm", methods=['GET'])
def pay_confirm():
    transaction_id = request.args.get('transactionId')
    obj = Transactions.query.filter_by(transaction_id=transaction_id).one_or_none()
    if obj is None:
        raise Exception("Error: transaction_id not found.")
    #


    response = pay.confirm_payments(transaction_id=transaction_id, amount=obj.amount, currency=obj.currency)
    # response = pay.confirm_payments(transaction_id=dummy_id, amount=amount, currency=currency)
    print(response["returnCode"])
    print(response["returnMessage"])
    #
    db.session.query(Transactions).filter(Transactions.transaction_id == transaction_id).delete()
    db.session.commit()
    db.session.close()
    return "Payment successfully finished."


def initialize_app(app: Flask) -> None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['DEBUG'] = True
    db.init_app(app)
    db.create_all(app=app)


def main() -> None:
    initialize_app(app)
    app.run(host='0.0.0.0', port=5000, threaded=True)


if __name__ == '__main__':
    main()

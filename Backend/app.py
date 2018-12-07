from flask import Flask, request, render_template
import psycopg2
app = Flask(__name__)


@app.route('/removeHW', methods=['POST'])
def removeHW():
    con = None
    try:
        print ("Endpoint reached")
        conn_string = "host='ec2-54-197-234-33.compute-1.amazonaws.com' dbname='db1spps0dlvmqh' port='5432' user='esijiopzwrpisz' password='0e12254844a007713161373b426528ef20a87be02da9da4cb641d1242767133d'"
        con = psycopg2.connect(conn_string)
        curs = con.cursor()
        hwName = request.form["hwName"]
        user = text['user']
        hwName = text['hwName']
        collegeN = (user, hwName, )
        curs.execute("DELETE FROM %s WHERE hwName = %s", collegeN)
        con.commit()
        curs.close()
    finally:
        if con:
            con.close()

if __name__ == '__main__':
    app.run()

from flask import Flask, request, render_template
import psycopg2
app = Flask(__name__)


@app.route('/removeHW', methods=['POST'])
def removeHW():
    con = None
    try:
        print ("Endpoint reached")
        conn_string = "host='ec2-174-129-41-12.compute-1.amazonaws.com' dbname='d5voje17q647tn' port='5432' user='atvungxynkajkc' password='42b9b99a8246ed64266e426afa1ddfe3288b5de68eab0f98bd96142b501e0a81'"
        con = psycopg2.connect(conn_string)
        curs = con.cursor()
        hwName = request.form["hwName"]
        user = "vbommena1"
        collegeN = (user, hwName, )
        curs.execute("DELETE FROM %s WHERE hwName = %s", collegeN)
        curs1 = con.cursor()
        curs1.execute("SELECT * FROM %s", (user, ))
        for row in curs1:
            print row
        con.commit()
        curs.close()
        curs1.close
    finally:
        if con:
            con.close()

if __name__ == '__main__':
    app.run()

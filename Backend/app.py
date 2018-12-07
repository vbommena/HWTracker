from flask import Flask, request, render_template
import psycopg2
app = Flask(__name__)


@app.route('/removeHW', methods=['POST'])
def removeHW():
    con = None
    try:
        print ("Endpoint reached")
        conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
        con = psycopg2.connect(conn_string)
        curs = con.cursor()
        hwName = request.form["hwName"]
        user = "vbommena1"
        collegeN = (user, hwName, )
        print (collegeN)
        curs.execute("DELETE FROM %s WHERE hwName = %s", collegeN)
        curs1 = con.cursor()
        print (user)
        curs1.execute("SELECT * FROM %s", (user, ))
        result = []
        for row in curs1:
            result.append(row)
        print (result)
        con.commit()
        curs.close()
        curs1.close()
    finally:
        if con:
            con.close()

if __name__ == '__main__':
    app.run()

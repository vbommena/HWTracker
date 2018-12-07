from flask import Flask
app = Flask(__name__)


@app.route('/removeHW', methods=['POST'])
def removeHW():
    return "Hello World!"

if __name__ == '__main__':
    app.run()

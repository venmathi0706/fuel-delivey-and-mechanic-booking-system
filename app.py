from flask import Flask, render_template, redirect, url_for, request, session
import mysql.connector
import random
import string

app = Flask(__name__)


# DB Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Venmathi@0706",
    database="mechanic_booking"
)
cursor = db.cursor()

# Home page
@app.route('/')
def index():
    return render_template('index.html')



# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_id = request.form['username'].strip()
        password = request.form['password'].strip()

        print("Login attempt:", user_id, password)

        cursor.execute("SELECT * FROM users WHERE (username=%s OR email=%s) AND password=%s",
                       (user_id, user_id, password))
        user = cursor.fetchone()

        print("User found:", user)

        if user:
            session['user'] = user[1]  # Assuming user[1] is the username
            return redirect(url_for('index'))
        else:
            return "Invalid login. Please check your username/email and password."
            
    return render_template('login.html')


# Signup page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Insert into DB
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                       (username, email, password))
        db.commit()

        print("Signup successful, redirecting to index...")  # Debugging

        # Redirect to home page
        return redirect(url_for('index'))  # Make sure this is being executed
        
    return render_template('signup.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'POST':
        fuel_type = request.form['fuelType']
        quantity = request.form['quantity']
        location = request.form['location']
        track_id = 'TRK' + ''.join(random.choices(string.digits, k=6))

        # Store in DB (optional)
        cursor.execute("INSERT INTO orders (fuel_type, quantity, location, track_id) VALUES (%s, %s, %s, %s)",
                       (fuel_type, quantity, location, track_id))
        db.commit()

        # Redirect to track page
        return redirect(url_for('track', trackId=track_id))
    return render_template('order.html')  # GET method returns the form

# Track page
@app.route('/track')
def track():
    return render_template('track.html')

# Order Status page
@app.route('/orderstatus')
def orderstatus():
   order_id = request.args.get('orderId')
    # logic to get order status
   return render_template('order-status.html', order_id=order_id)
# Mechanic Booking page
@app.route('/mechanicbooking')
def mechanicbooking():
    return render_template('mechanicbook.html')

# Mechanic Tracking page
@app.route('/mechanictracking')
def mechanictracking():
    return render_template('mechanictracking.html')

# Logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.secret_key = 'your_secret_key_here'
    app.run(debug=True)
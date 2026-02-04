"use client";
import React  from "react";
import Header from "../learn/header";
import Footer from "../learn/footer";

const Contact = () => {

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const firstName = form["first-name"].value.trim();
    const lastName = form["last-name"].value.trim();
    const email = form.email.value.trim();
    const phone = form["phone-number"].value.trim();
    const message = form.message.value.trim();
    const policy = form.policy.checked;

    // Validation
    if (!firstName) return alert("Ismni kiriting!");
    if (!lastName) return alert("Familiyani kiriting!");
    if (!email || !/.+@.+\..+/.test(email)) return alert("To‘g‘ri email kiriting!");
    if (!phone) return alert("Telefon raqamni kiriting!");
    if (!message) return alert("Xabar yozing!");
    if (!policy) return alert("Iltimos, maxfiylik siyosatiga rozilik bildiring!");

    // 🚀 API ga yuborish
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, message, policy }),
    });

    if (res.ok) {
      alert("Form muvaffaqiyatli yuborildi!");
      form.reset();
    } else {
      alert("Xatolik! Form yuborilmadi.");
    }
  }

  return (
    <div className="all">
           

      <Header/>

      <div className="contact-wrapper">
        <div className="contact-header">
          <h2>Contact Us</h2>
       
        </div>

        <form method="post" className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="first-name">First name</label>
              <input type="text" name="first-name" id="first-name" />
            </div>

            <div className="form-field">
              <label htmlFor="last-name">Last name</label>
              <input type="text" name="last-name" id="last-name" />
            </div>

            <div className="form-field full">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="form-field full">
              <label htmlFor="password">Email password</label>
              <input type="password" name="phone-number" id="phone-number" />
            </div>

            <div className="form-field full">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4" placeholder="How much is your beginner course?"></textarea>
            </div>
          </div>

          <div className="policy-check">
            <input type="checkbox" id="policy" name="policy" />
            <label htmlFor="policy">
              By selecting this, you agree to our{" "}
              <a href="#" className="policy-link">privacy policy</a>.
            </label>
          </div>

          <div className="form-submit">
            <button type="submit">Let's talk</button>
          </div>
        </form>
      </div>

     <Footer/>
    </div>
  );
};

export default Contact;

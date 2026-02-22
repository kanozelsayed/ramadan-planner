import { useState, useEffect } from "react";
import { Card, GText, Btn, STitle } from "../components/UI";
import { useUser } from "../context/UserContext";
// 1. استيراد التوست
import toast from 'react-hot-toast';

export default function AuthPage() {
  const { setUser } = useUser();
  const [step, setStep] = useState(0); 
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", language: "ar", country: "Egypt" });

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2500); 
      return () => clearTimeout(timer);
    }
  }, [step]);

  const texts = {
    ar: {
      welcome: "رمضان مبارك | Ramadan Mubarak",
      description: "رفيقك المثالي لتنظيم وقتك، تتبع صلواتك، وتحقيق أهدافك الإيمانية خلال الشهر الفضيل.",
      descriptionEn: "Your ultimate companion to organize your time and track your prayers during the holy month.",
      btnStart: "ابدأ الرحلة | Let's Start",
      langTitle: "اختر لغتك المفضلة / Select Language",
      authTitle: isLogin ? "تسجيل الدخول" : "إنشاء حساب",
      emailPh: "البريد الإلكتروني",
      namePh: "الاسم الكامل",
      btnNext: "التالي",
      btnEnter: "ابدأ الرحلة",
      countryTitle: "اختر دولتك",
      loginTab: "دخول",
      signupTab: "تسجيل",
      back: "رجوع",
      errorEmail: "⚠️ صيغة البريد غير صحيحة",
      errorName: "⚠️ يرجى إدخال الاسم",
      successLogin: "أهلاً بك في رحلة رمضان 🌙"
    },
    en: {
      welcome: "Ramadan Mubarak | رمضان مبارك",
      description: "Your ultimate companion to organize your time and track your prayers during the holy month.",
      descriptionEn: "رفيقك المثالي لتنظيم وقتك، تتبع صلواتك، وتحقيق أهدافك الإيمانية خلال الشهر الفضيل.",
      btnStart: "Let's Start | ابدأ الرحلة",
      langTitle: "Select Language / اختر لغتك",
      authTitle: isLogin ? "Login" : "Sign Up",
      emailPh: "Email Address",
      namePh: "Full Name",
      btnNext: "Next",
      btnEnter: "Start Journey",
      countryTitle: "Select Your Country",
      loginTab: "Login",
      signupTab: "Sign Up",
      back: "Back",
      errorEmail: "⚠️ Invalid email format",
      errorName: "⚠️ Please enter your name",
      successLogin: "Welcome to your Ramadan journey! 🌙"
    }
  };

  const t = texts[formData.language] || texts.ar;

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div style={{ 
      height: "100vh", width: "100vw", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      background: "linear-gradient(135deg,#04041f 0%,#0d0d45 100%)",
      paddingTop: "5vh",
      direction: formData.language === 'ar' ? 'rtl' : 'ltr',
      transition: "all 0.5s ease"
    }}>
      
      <div style={{ textAlign: "center", transition: "all 1s ease", transform: step === 0 ? "translateY(30vh)" : "translateY(0)", marginBottom: "20px" }}>
        <div style={{ fontSize: step === 0 ? "70px" : "40px", transition: "0.8s", animation: "float 3s infinite" }}>🌙</div>
        <div style={{ marginTop: "10px" }}>
           <GText size={step === 0 ? 36 : 22} bold color="#c9a227">{t.welcome}</GText>
        </div>
      </div>

      {step > 0 && (
        <Card dark style={{ 
          width: "450px", padding: "40px", textAlign: "center", animation: "fadeUp 0.6s ease", 
          background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", 
          border: "1px solid rgba(201, 162, 39, 0.15)", borderRadius: "24px", position: "relative" 
        }}>
          
          {step > 1 && (
            <button 
              onClick={() => setStep(step === 2 ? 1.5 : step - 1)} 
              style={{ position: "absolute", top: "20px", [formData.language === 'ar' ? 'right' : 'left']: "20px", background: "transparent", border: "none", color: "#c9a227", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
            >
              {formData.language === 'ar' ? "←" : "→"} {t.back}
            </button>
          )}

          {step === 1 && (
            <div style={{ animation: "fadeUp 0.8s ease-out" }}>
              <div style={{ marginBottom: "30px", padding: "10px" }}>
                <p style={{ fontSize: "18px", color: "#e8d5a3", fontFamily: "'Amiri', serif", marginBottom: "15px", lineHeight: "1.6" }}>{t.description}</p>
                <div style={{ width: "40px", height: "2px", background: "#c9a227", margin: "15px auto", opacity: 0.5 }}></div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.5" }}>{t.descriptionEn}</p>
              </div>
              <Btn style={{ width: "100%", height: "55px", fontSize: "18px" }} onClick={() => setStep(1.5)}>{t.btnStart}</Btn>
            </div>
          )}

          {step === 1.5 && (
            <div>
              <STitle style={{fontSize: "18px", marginBottom: "25px"}}>{t.langTitle}</STitle>
              <div style={{ display: "flex", gap: "15px" }}>
                <Btn style={{ flex: 1 }} onClick={() => { setFormData({...formData, language: "ar"}); setStep(2); }}>العربية</Btn>
                <Btn style={{ flex: 1 }} onClick={() => { setFormData({...formData, language: "en"}); setStep(2); }}>English</Btn>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <STitle style={{marginBottom: "20px"}}>{t.authTitle}</STitle>
              <div style={{ display: "flex", background: "rgba(0,0,0,0.4)", borderRadius: "12px", marginBottom: "25px", padding: "5px" }}>
                <button onClick={() => setIsLogin(false)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: "10px", cursor: "pointer", background: !isLogin ? "#c9a227" : "transparent", color: !isLogin ? "#000" : "#fff", fontWeight: 'bold', transition: "0.3s" }}>{t.signupTab}</button>
                <button onClick={() => setIsLogin(true)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: "10px", cursor: "pointer", background: isLogin ? "#c9a227" : "transparent", color: isLogin ? "#000" : "#fff", fontWeight: 'bold', transition: "0.3s" }}>{t.loginTab}</button>
              </div>
              
              <div style={{ marginBottom: "15px", textAlign: "start" }}>
                <input type="email" placeholder={t.emailPh} style={{...inputStyle, borderColor: formData.email && !isEmailValid(formData.email) ? "#ff4444" : "rgba(201,162,39,0.2)"}} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                {formData.email && !isEmailValid(formData.email) && <div style={{ color: "#ff4444", fontSize: "11px", marginTop: "4px" }}>{t.errorEmail}</div>}
              </div>

              {!isLogin && (
                <div style={{ marginBottom: "15px", textAlign: "start" }}>
                   <input type="text" placeholder={t.namePh} style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   {formData.email && isEmailValid(formData.email) && !formData.name && <div style={{ color: "#ff4444", fontSize: "11px", marginTop: "4px" }}>{t.errorName}</div>}
                </div>
              )}
              
              <Btn 
                style={{ width: "100%", marginTop: "10px", opacity: (isEmailValid(formData.email) && (isLogin || formData.name)) ? 1 : 0.5 }} 
                onClick={() => {
                  // 2. التحقق بالتوست بدل الـ alert
                  if (!isEmailValid(formData.email)) {
                    toast.error(t.errorEmail);
                  } else if (!isLogin && !formData.name) {
                    toast.error(t.errorName);
                  } else {
                    setStep(3);
                  }
                }}
              >
                {t.btnNext}
              </Btn>
            </div>
          )}

          {step === 3 && (
            <div>
              <STitle>{t.countryTitle}</STitle>
              <select value={formData.country} style={{ ...inputStyle, background: "#0a0a2a", color: "#f5e56b", marginTop: "20px", cursor: "pointer" }} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                <option value="Egypt">Egypt 🇪🇬</option>
                <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                <option value="Palestine">Palestine 🇵🇸</option>
                <option value="UAE">UAE 🇦🇪</option>
                <option value="Jordan">Jordan 🇯🇴</option>
              </select>
              <Btn 
                style={{ width: "100%", marginTop: "20px" }} 
                onClick={() => {
                  // 3. توست النجاح عند الدخول
                  setUser({...formData, isLoggedIn: true});
                  toast.success(t.successLogin);
                }}
              >
                {t.btnEnter}
              </Btn>
            </div>
          )}
        </Card>
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        select option { background: #0d0d45; color: #fff; }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(201,162,39,0.2)", color: "#fff", outline: "none", boxSizing: "border-box", marginBottom: "15px",
  transition: "all 0.3s"
};
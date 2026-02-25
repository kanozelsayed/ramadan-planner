import { useState, useEffect } from "react";
import { Card, GText, Btn, STitle } from "../components/UI";
import { useUser } from "../context/UserContext";
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
      minHeight: "100vh", // استخدام minHeight لضمان التغطية مع السكرول
      width: "100%", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center", // توسيط المحتوى دائماً
      background: "linear-gradient(135deg,#04041f 0%,#0d0d45 100%)",
      padding: "20px",
      boxSizing: "border-box",
      direction: formData.language === 'ar' ? 'rtl' : 'ltr',
      transition: "all 0.5s ease",
      overflowX: "hidden"
    }}>
      
      {/* القسم العلوي (الهلال والترحيب) */}
      <div style={{ 
        textAlign: "center", 
        transition: "all 0.8s ease", 
        transform: step === 0 ? "translateY(0)" : "translateY(0)", 
        marginBottom: step === 0 ? "0" : "20px",
        marginTop: step === 0 ? "0" : "20px"
      }}>
        <div style={{ 
          fontSize: step === 0 ? "80px" : "40px", 
          transition: "0.8s", 
          animation: "float 3s infinite",
          marginBottom: "10px"
        }}>🌙</div>
        <GText size={step === 0 ? (window.innerWidth < 480 ? 28 : 36) : 20} bold color="#c9a227">
          {t.welcome}
        </GText>
      </div>

      {step > 0 && (
        <Card dark style={{ 
          width: "100%",
          maxWidth: "450px", 
          padding: window.innerWidth < 480 ? "25px 20px" : "40px", 
          textAlign: "center", 
          animation: "fadeUp 0.6s ease", 
          background: "rgba(255, 255, 255, 0.03)", 
          backdropFilter: "blur(20px)", 
          border: "1px solid rgba(201, 162, 39, 0.15)", 
          borderRadius: "24px", 
          position: "relative",
          boxSizing: "border-box"
        }}>
          
          {step > 1 && (
            <button 
              onClick={() => setStep(step === 2 ? 1.5 : step - 1)} 
              style={{ 
                position: "absolute", 
                top: "15px", 
                [formData.language === 'ar' ? 'right' : 'left']: "20px", 
                background: "transparent", 
                border: "none", 
                color: "#c9a227", 
                cursor: "pointer", 
                fontSize: "13px", 
                fontWeight: "bold",
                zIndex: 10
              }}
            >
              {formData.language === 'ar' ? "←" : "→"} {t.back}
            </button>
          )}

          {step === 1 && (
            <div style={{ animation: "fadeUp 0.8s ease-out" }}>
              <div style={{ marginBottom: "25px" }}>
                <p style={{ fontSize: "17px", color: "#e8d5a3", fontFamily: "'Amiri', serif", marginBottom: "12px", lineHeight: "1.6" }}>{t.description}</p>
                <div style={{ width: "40px", height: "2px", background: "#c9a227", margin: "12px auto", opacity: 0.5 }}></div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.5" }}>{t.descriptionEn}</p>
              </div>
              <Btn style={{ width: "100%", height: "50px", fontSize: "17px" }} onClick={() => setStep(1.5)}>{t.btnStart}</Btn>
            </div>
          )}

          {step === 1.5 && (
            <div>
              <STitle style={{fontSize: "18px", marginBottom: "20px"}}>{t.langTitle}</STitle>
              <div style={{ display: "flex", gap: "10px" }}>
                <Btn style={{ flex: 1 }} onClick={() => { setFormData({...formData, language: "ar"}); setStep(2); }}>العربية</Btn>
                <Btn style={{ flex: 1 }} onClick={() => { setFormData({...formData, language: "en"}); setStep(2); }}>English</Btn>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <STitle style={{marginBottom: "15px", fontSize: "20px"}}>{t.authTitle}</STitle>
              <div style={{ display: "flex", background: "rgba(0,0,0,0.4)", borderRadius: "12px", marginBottom: "20px", padding: "4px" }}>
                <button onClick={() => setIsLogin(false)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer", background: !isLogin ? "#c9a227" : "transparent", color: !isLogin ? "#000" : "#fff", fontWeight: 'bold', transition: "0.3s", fontSize: "14px" }}>{t.signupTab}</button>
                <button onClick={() => setIsLogin(true)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer", background: isLogin ? "#c9a227" : "transparent", color: isLogin ? "#000" : "#fff", fontWeight: 'bold', transition: "0.3s", fontSize: "14px" }}>{t.loginTab}</button>
              </div>
              
              <div style={{ marginBottom: "12px", textAlign: "start" }}>
                <input type="email" placeholder={t.emailPh} style={{...inputStyle, borderColor: formData.email && !isEmailValid(formData.email) ? "#ff4444" : "rgba(201,162,39,0.2)"}} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                {formData.email && !isEmailValid(formData.email) && <div style={{ color: "#ff4444", fontSize: "11px", marginTop: "2px" }}>{t.errorEmail}</div>}
              </div>

              {!isLogin && (
                <div style={{ marginBottom: "12px", textAlign: "start" }}>
                   <input type="text" placeholder={t.namePh} style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   {formData.email && isEmailValid(formData.email) && !formData.name && <div style={{ color: "#ff4444", fontSize: "11px", marginTop: "2px" }}>{t.errorName}</div>}
                </div>
              )}
              
              <Btn 
                style={{ width: "100%", marginTop: "5px", height: "48px", opacity: (isEmailValid(formData.email) && (isLogin || formData.name)) ? 1 : 0.5 }} 
                onClick={() => {
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
              <STitle style={{fontSize: "18px"}}>{t.countryTitle}</STitle>
              <select value={formData.country} style={{ ...inputStyle, background: "#0a0a2a", color: "#f5e56b", marginTop: "15px", cursor: "pointer", fontSize: "16px" }} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                <option value="Egypt">Egypt 🇪🇬</option>
                <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                <option value="Palestine">Palestine 🇵🇸</option>
                <option value="UAE">UAE 🇦🇪</option>
                <option value="Jordan">Jordan 🇯🇴</option>
              </select>
              <Btn 
                style={{ width: "100%", marginTop: "15px", height: "48px" }} 
                onClick={() => {
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
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: "100%", 
  padding: "12px 15px", 
  borderRadius: "12px", 
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(201,162,39,0.2)", 
  color: "#fff", 
  outline: "none", 
  boxSizing: "border-box", 
  fontSize: "16px", // منع الزوم التلقائي
  transition: "all 0.3s"
};
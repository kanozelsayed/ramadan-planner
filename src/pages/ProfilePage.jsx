import { Card, GText, STitle, Btn } from "../components/UI";
import { useUser } from "../context/UserContext";

export default function ProfilePage({ dark }) {
  const { user, setUser } = useUser();

  const updateField = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const logout = () => {
    setUser({ ...user, isLoggedIn: false });
  };

  const t = {
    title: user.language === 'ar' ? "👤 الملف الشخصي" : "👤 PROFILE SETTINGS",
    name: user.language === 'ar' ? "الاسم" : "Full Name",
    lang: user.language === 'ar' ? "اللغة" : "Language",
    country: user.language === 'ar' ? "الدولة" : "Country",
    logout: user.language === 'ar' ? "تسجيل الخروج" : "Logout"
  };

  // استايل موحد ومتجاوب للمدخلات
  const inputStyle = {
    width: "100%", 
    padding: "12px", 
    borderRadius: "10px", 
    background: "rgba(255,255,255,0.05)", 
    border: "1px solid rgba(201,162,39,0.2)",
    color: "#fff", 
    marginTop: "8px", 
    outline: "none",
    fontSize: "16px", // منع الـ Auto-zoom في iOS
    boxSizing: "border-box",
    textAlign: user.language === 'ar' ? 'right' : 'left'
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 20,
      width: "100%",
      maxWidth: "500px",
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box",
      direction: user.language === 'ar' ? 'rtl' : 'ltr'
    }}>
      <GText size={24} style={{ textAlign: "center" }}>{t.title}</GText>

      <Card dark={dark} style={{ padding: window.innerWidth < 480 ? "20px" : "30px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          
          {/* حقل الاسم */}
          <div>
            <STitle>{t.name}</STitle>
            <input 
              style={inputStyle} 
              value={user.name} 
              onChange={(e) => updateField('name', e.target.value)} 
            />
          </div>

          {/* اختيار اللغة */}
          <div>
            <STitle>{t.lang}</STitle>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <Btn 
                style={{ flex: 1 }} 
                outline={user.language !== 'ar'} 
                onClick={() => updateField('language', 'ar')}
              >
                العربية
              </Btn>
              <Btn 
                style={{ flex: 1 }} 
                outline={user.language !== 'en'} 
                onClick={() => updateField('language', 'en')}
              >
                English
              </Btn>
            </div>
          </div>

          {/* اختيار الدولة */}
          <div>
            <STitle>{t.country}</STitle>
            <select 
              style={inputStyle} 
              value={user.country} 
              onChange={(e) => updateField('country', e.target.value)}
            >
              <option value="Egypt">Egypt 🇪🇬</option>
              <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
              <option value="Palestine">Palestine 🇵🇸</option>
            </select>
          </div>

          {/* زر تسجيل الخروج */}
          <Btn 
            outline 
            style={{ 
              marginTop: 10, 
              borderColor: "#ff4444", 
              color: "#ff4444",
              width: "100%" 
            }} 
            onClick={logout}
          >
            {t.logout}
          </Btn>

        </div>
      </Card>
    </div>
  );
}
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

  const inputStyle = {
    width: "100%", padding: "10px", borderRadius: "8px", 
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,162,39,0.2)",
    color: "#fff", marginTop: "5px", outline: "none"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <GText size={24}>{t.title}</GText>

      <Card dark={dark} style={{ padding: 30 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          <div>
            <STitle>{t.name}</STitle>
            <input 
              style={inputStyle} 
              value={user.name} 
              onChange={(e) => updateField('name', e.target.value)} 
            />
          </div>

          <div>
            <STitle>{t.lang}</STitle>
            <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
              <Btn outline={user.language !== 'ar'} onClick={() => updateField('language', 'ar')}>العربية</Btn>
              <Btn outline={user.language !== 'en'} onClick={() => updateField('language', 'en')}>English</Btn>
            </div>
          </div>

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

          <Btn outline style={{ marginTop: 20, borderColor: "#ff4444", color: "#ff4444" }} onClick={logout}>
            {t.logout}
          </Btn>

        </div>
      </Card>
    </div>
  );
}
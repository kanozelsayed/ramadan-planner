import { Card, GText, STitle } from "../components/UI";
import toast from 'react-hot-toast';
import { useUser } from "../context/Context/UserContext"; // تأكدي من صحة المسار عندك

export default function QuranPage({ juz, setJuz, dark }) {
  const { user } = useUser();

  const toggleJuz = (index) => {
    const isArabic = user.language === 'ar';

    if (!juz[index]) {
      if (index > 0 && !juz[index - 1]) {
        toast.error(
          isArabic 
            ? "يجب الانتهاء من الأجزاء السابقة أولاً 🛑" 
            : "Previous parts must be completed first 🛑",
          { duration: 4000 }
        );
        return;
      }
      
      const newJuz = [...juz];
      newJuz[index] = true;
      setJuz(newJuz);
      toast.success(
        isArabic 
          ? `تبارك الله! أتممت الجزء ${index + 1} ✨` 
          : `Great job! Juz ${index + 1} completed ✨`,
        { duration: 4000 }
      );
    } 
    else {
      if (index < juz.length - 1 && juz[index + 1]) {
        toast.error(
          isArabic 
            ? "لا يمكن إلغاء التحديد، توجد أجزاء تالية مكتملة ⚠️" 
            : "Cannot uncheck, subsequent parts are completed ⚠️",
          { duration: 4000 }
        );
        return;
      }

      const newJuz = [...juz];
      newJuz[index] = false;
      setJuz(newJuz);
      toast.error(
        isArabic 
          ? `تم إلغاء تحديد الجزء ${index + 1}` 
          : `Selection removed for Juz ${index + 1}`,
        { duration: 4000, icon: '🔄' }
      );
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 20, 
      animation: "fadeUp 0.5s ease",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box",
      direction: user.language === 'ar' ? 'rtl' : 'ltr'
    }}>
      
      {/* العنوان والعداد */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "0 5px" 
      }}>
        <STitle style={{ fontSize: window.innerWidth < 480 ? "18px" : "22px" }}>
          {user.language === 'ar' ? "📖 ختم القرآن الكريم" : "📖 Quran Completion"}
        </STitle>
        <GText color="#c9a227" bold size={window.innerWidth < 480 ? 16 : 20}>
          {juz.filter(Boolean).length} / 30
        </GText>
      </div>
      
      {/* شبكة الأجزاء المتجاوبة */}
      <div style={{ 
        display: "grid", 
        // المربعات هتصغر وتكبر تلقائياً وأقل عرض للمربع 75px عشان يشيل 4 في الصف في الموبايلات العادية
        gridTemplateColumns: "repeat(auto-fill, minmax(75px, 1fr))", 
        gap: window.innerWidth < 480 ? "8px" : "12px"
      }}>
        {juz.map((done, i) => (
          <div 
            key={i} 
            onClick={() => toggleJuz(i)}
            style={{
              height: window.innerWidth < 480 ? "75px" : "90px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "18px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: done ? "2px solid #c9a227" : "1px solid rgba(255,255,255,0.1)",
              background: done ? "rgba(201,162,39,0.2)" : "rgba(255,255,255,0.03)",
              color: done ? "#c9a227" : "rgba(255,255,255,0.5)",
              transform: done ? "scale(1.05)" : "scale(1)",
              boxSizing: "border-box",
              // إضافة ظل خفيف للأجزاء المخلصة
              boxShadow: done ? "0 4px 15px rgba(201,162,39,0.15)" : "none"
            }}
          >
            <span style={{ fontSize: "10px", marginBottom: "2px", opacity: 0.8 }}>
              {user.language === 'ar' ? "جزء" : "JUZ"}
            </span>
            <span style={{ fontSize: window.innerWidth < 480 ? "18px" : "22px", fontWeight: "bold" }}>
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
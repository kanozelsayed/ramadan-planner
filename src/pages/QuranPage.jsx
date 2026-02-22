import { Card, GText, STitle } from "../components/UI";
import toast from 'react-hot-toast';
import { useUser } from "../context/UserContext"; // استيراد الـ Context

export default function QuranPage({ juz, setJuz, dark }) {
  const { user } = useUser(); // الحصول على لغة المستخدم

  const toggleJuz = (index) => {
    const isArabic = user.language === 'ar';

    // 1. لو بنحاول نعلم على جزء إنه "خلص"
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
    // 2. لو بنحاول نلغي علامة "الخلص"
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp 0.5s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <STitle>
          {user.language === 'ar' ? "📖 ختم القرآن الكريم" : "📖 Quran Completion"}
        </STitle>
        <GText color="#c9a227" bold>
          {juz.filter(Boolean).length} / 30
        </GText>
      </div>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr))", 
        gap: "12px"
      }}>
        {juz.map((done, i) => (
          <div 
            key={i} 
            onClick={() => toggleJuz(i)}
            style={{
              height: "90px",
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
              transform: done ? "scale(1.02)" : "scale(1)"
            }}
          >
            <span style={{ fontSize: "11px", marginBottom: "4px" }}>
              {user.language === 'ar' ? "جزء" : "JUZ"}
            </span>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
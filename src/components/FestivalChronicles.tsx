import React, { useState } from "react";
import {
  Scroll,
  BookOpen,
  Sparkles,
  Shield,
  Heart,
  Crown,
  History,
  Sun,
  Flame,
  Check,
  Copy,
  ChevronRight,
  Landmark,
} from "lucide-react";
import { toast } from "sonner";
import { festiveAudio } from "@/lib/soundEffects";

interface FestivalChroniclesProps {
  onApplyMessage?: (message: string) => void;
}

export const FestivalChronicles: React.FC<FestivalChroniclesProps> = ({ onApplyMessage }) => {
  const [activeTab, setActiveTab] = useState<"shloka" | "mythology" | "history" | "regional">("shloka");
  const [copiedShloka, setCopiedShloka] = useState(false);

  const VEDIC_SHLOKA = `येन बद्धो बलिराजा दानवेन्द्रो महाबल:।
तेन त्वामपि बध्नामि रक्षे मा चल मा चल ॥`;

  const SHLOKA_MEANING = `जिस रक्षासूत्र से महान शक्तिशाली दानवेन्द्र राजा बलि को बाँधा गया था, उसी सूत्र से मैं तुझे बाँधता हूँ। हे रक्षे (राखी)! तुम अडिग रहना, अपने रक्षा के संकल्प से कभी विचलित न होना।`;

  const copyShloka = () => {
    festiveAudio.playSparkle();
    navigator.clipboard.writeText(`${VEDIC_SHLOKA}\n\nअर्थ: ${SHLOKA_MEANING}`);
    setCopiedShloka(true);
    toast.success("वैदिक श्लोक और भावार्थ कॉपी हो गया! ✨");
    setTimeout(() => setCopiedShloka(false), 2500);
  };

  const handleUseInCard = (text: string) => {
    festiveAudio.playSparkle();
    if (onApplyMessage) {
      onApplyMessage(text);
      toast.success("कार्ड में संदेश सफलतापूर्वक जोड़ दिया गया! 🪔");
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-16 sm:mt-24 max-w-5xl mx-auto" aria-label="Festive Heritage & History">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-primary mb-3">
          <Scroll className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
          <span>वैदिक धरोहर एवं ऐतिहासिक प्रसंग</span>
        </div>
        <h2
          className="font-cinzel font-bold text-foreground"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", letterSpacing: "-0.015em", lineHeight: 1.15 }}
        >
          रक्षाबन्धन: इतिहास, पौराणिक कथाएँ एवं सांस्कृतिक महत्त्व
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2.5 max-w-2xl mx-auto leading-relaxed">
          भारतीय संस्कृति और विकिपीडिया अभिलेखागार पर आधारित रक्षाबन्धन के पावन प्रसंग, अमर वैदिक मन्त्र एवं ऐतिहासिक कथाएँ।
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: "shloka", label: "पवित्र वैदिक श्लोक", icon: Flame },
          { id: "mythology", label: "पौराणिक प्रसंग (देव-दानव)", icon: Sparkles },
          { id: "history", label: "ऐतिहासिक गाथाएँ (हुमायूँ व टैगोर)", icon: History },
          { id: "regional", label: "विभिन्न प्रान्तों में उत्सव", icon: Landmark },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                festiveAudio.playSparkle();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all press-effect ${
                isActive
                  ? "bg-grad-gold text-amber-950 shadow-glow-sm border-transparent font-black"
                  : "glass text-muted-foreground hover:text-foreground hover:border-amber-400/40"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: VEDIC SHLOKA ── */}
      {activeTab === "shloka" && (
        <div className="glass-heavy glass-shine-top rounded-3xl p-6 sm:p-10 border border-amber-400/40 shadow-2xl relative overflow-hidden animate-spring-in">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
              <span>ऋग्वैदिक रक्षासूत्र संकल्प मन्त्र</span>
            </div>

            {/* Sacred Sanskrit verse in Rozha One / Cinzel typography */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border border-amber-400/40 shadow-glow-sm">
              <p className="font-serif-luxury text-xl sm:text-3xl text-gradient-gold font-bold leading-relaxed sm:leading-loose">
                {VEDIC_SHLOKA}
              </p>
            </div>

            {/* Hindi Meaning */}
            <div className="text-left p-5 sm:p-6 rounded-2xl glass-subtle space-y-2">
              <h4 className="font-cinzel text-xs font-black uppercase tracking-wider text-primary">
                सरल हिन्दी भावार्थ:
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-medium">
                "{SHLOKA_MEANING}"
              </p>
              <p className="text-xs text-muted-foreground pt-1 border-t border-amber-500/15">
                • हिन्दू अनुष्ठानों में आचार्य द्वारा यजमान को एवं बहन द्वारा भाई को रक्षासूत्र बाँधते समय इस मन्त्र का उच्चारण अनिवार्य माना जाता है।
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={copyShloka}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border-amber-400/40 text-xs font-bold text-foreground hover:border-amber-400 press-effect transition"
              >
                {copiedShloka ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-primary" />}
                <span>{copiedShloka ? "श्लोक कॉपी हो गया!" : "श्लोक कॉपी करें"}</span>
              </button>

              <button
                onClick={() => handleUseInCard(`${VEDIC_SHLOKA}\n\n"${SHLOKA_MEANING}"`)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-grad-festive text-xs font-bold text-white shadow-md hover:shadow-glow press-effect transition"
              >
                <Sparkles className="h-4 w-4" />
                <span>इस श्लोक को मेरे कार्ड में जोड़ें ✨</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: MYTHOLOGICAL LEGENDS ── */}
      {activeTab === "mythology" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-spring-in">
          {/* Legend 1: King Bali & Goddess Lakshmi */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  👑
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    राजा बलि और देवी लक्ष्मी
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    श्रावण पूर्णिमा उद्गम
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                वामन अवतार में भगवान विष्णु ने दानवीर राजा बलि से तीन पग भूमि मांगकर पाताल लोक का द्वारपाल बनने का वचन दिया। बैकुंठ में श्रीहरि के वियोग से व्यथित होकर माता लक्ष्मी ने एक सामान्य स्त्री का रूप धारण किया और राजा बलि को रक्षासूत्र बाँधकर भाई बनाया। उपहार स्वरूप उन्होंने भगवान विष्णु को मुक्त कराने का वचन मांग लिया। इस प्रकार श्रावण पूर्णिमा को रक्षाबन्धन का यह पावन पर्व प्रतिष्ठित हुआ।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "श्रावण पूर्णिमा पर माता लक्ष्मी द्वारा राजा बलि को रक्षासूत्र बाँधने की पावन परंपरा आपके जीवन में सुख, समृद्धि और अमर सुरक्षा लाए। शुभ रक्षाबन्धन!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Legend 2: Lord Krishna & Draupadi */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  🪷
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    भगवान श्रीकृष्ण और द्रौपदी
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    चीर हरण रक्षा का संकल्प
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                शिशुपाल वध के समय सुदर्शन चक्र से भगवान श्रीकृष्ण की कनिष्ठिका उँगली कट गई और रक्त की धारा बहने लगी। द्रौपदी ने बिना एक पल गँवाए अपनी बहुमूल्य रेशमी साड़ी का छोर फाड़कर प्रभु की उँगली पर बाँध दिया। श्रीकृष्ण ने कृतज्ञ होकर द्रौपदी को वचन दिया—"बहन, इस रेशम के एक-एक धागे का ऋण मैं समय आने पर चुकाऊँगा।" कौरवों की भरी सभा में चीरहरण के समय प्रभु ने असीम वस्त्र प्रदान कर द्रौपदी की लाज बचाई।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "जैसे भगवान श्रीकृष्ण ने द्रौपदी के रेशमी धागे का मान रखकर चीरहरण में रक्षा की, वैसे ही हमारा स्नेह और रक्षा का संकल्प हर जन्म में अटल रहे। हैप्पी रक्षाबंधन!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Legend 3: Indra & Indrani (Sachi) */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  ⚡
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    देवराज इन्द्र और इंद्राणी शची
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    भविष्य पुराण आख्यान
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                भविष्य पुराण के अनुसार, देवासुर संग्राम में जब वृत्रासुर के आतंक से देवता पराजित होने लगे, तब देवगुरु बृहस्पति के निर्देश पर इन्द्र की पत्नी शची (इंद्राणी) ने मन्त्र-पूत रेशमी रक्षासूत्र तैयार किया। श्रावण शुक्ल पूर्णिमा के दिन उन्होंने इन्द्र की दाहिनी कलाई पर यह रक्षासूत्र बाँधा। इस दिव्य कवच के प्रभाव से इन्द्र ने असुरों पर निर्णायक विजय प्राप्त की और स्वर्ग पर देवराज का अधिपत्य पुनः स्थापित हुआ।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "इंद्राणी द्वारा देवराज इन्द्र को बाँधे गए अजेय रक्षासूत्र की तरह, यह पावन राखी आपके जीवन की हर बाधा और संकट से रक्षा करे। मंगलमय रक्षाबन्धन!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Legend 4: Yama & Yamuna */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  🌊
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    यमराज और बहन यमुना
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    अमरत्व और अकाल मृत्यु से मुक्ति
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                मृत्यु के देवता यमराज को उनकी बहन यमुना ने श्रावण पूर्णिमा पर राखी बाँधकर उनकी दीर्घायु एवं अमरत्व की कामना की। यमराज इस असीम भ्रातृ-प्रेम से इतने प्रसन्न हुए कि उन्होंने वरदान दिया कि जो भाई श्रावण पूर्णिमा पर अपनी बहन से राखी बँधवाएगा और उसकी रक्षा का संकल्प लेगा, वह अकाल मृत्यु के भय से मुक्त रहेगा और उसे दीर्घायु तथा सुख-समृद्धि का आशीर्वाद प्राप्त होगा।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "यमराज और यमुना के पावन रिश्ते की तरह, यह रक्षासूत्र आपके जीवन को दीर्घायु, उत्तम स्वास्थ्य और असीम सुख-शांति से परिपूर्ण रखे। रक्षाबन्धन की ढेरों शुभकामनाएँ!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* ── TAB 3: HISTORICAL CHRONICLES ── */}
      {activeTab === "history" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-spring-in">
          {/* History 1: Rani Karnavati and Emperor Humayun */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  🏰
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    चित्तौड़ की रानी कर्णावती और हुमायूँ (1535 ई.)
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    ऐतिहासिक भाईचारे की मिसाल
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                जब गुजरात के सुल्तान बहादुर शाह ने मेवाड़ की राजधानी चित्तौड़गढ़ पर आक्रमण किया, तो असहाय विधवा रानी कर्णावती ने मुग़ल सम्राट हुमायूँ को राखी भेजकर भाई का धर्म निभाने की पुकार की। हुमायूँ ने राखी का सम्मान किया, अपना ग्वालियर सैन्य अभियान बीच में रोक दिया और रानी की सहायता के लिए चित्तौड़ की ओर कूच किया। हुमायूँ ने बहादुर शाह को पराजित कर रानी कर्णावती के पुत्र को चित्तौड़ की गद्दी पर बैठाया।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "रानी कर्णावती और हुमायूँ के ऐतिहासिक रक्षासूत्र की तरह, हमारा यह पवित्र रिश्ता हर दूरी, समय और परिस्थिति से परे सदैव अटूट और सर्वोच्च रहेगा। शुभ रक्षाबंधन!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* History 2: Rabindranath Tagore and 1905 Bengal Partition */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  🕊️
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    रवीन्द्रनाथ ठाकुर और 1905 बंग-भंग आन्दोलन
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    स्वतन्त्रता संग्राम में सामाजिक एकता
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                16 अक्टूबर 1905 को जब लॉर्ड कर्ज़न ने बंगाल का विभाजन किया, तो गुरुदेव रवीन्द्रनाथ ठाकुर ने रक्षाबन्धन को हिन्दू-मुस्लिम एकता और साम्प्रदायिक सौहार्द का राष्ट्रीय प्रतीक बना दिया। हजारों लोगों ने गंगा स्नान किया और एक-दूसरे की कलाइयों पर राखियाँ बाँधकर यह संकल्प लिया कि कोई भी विदेशी शक्ति भारत के नागरिकों को आपस में बाँट नहीं सकती। यह पर्व राष्ट्र-रक्षा का पावन अनुष्ठान बन गया।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "गुरुदेव रवीन्द्रनाथ ठाकुर के शब्दों में—'प्रत्येक भाई-बहन का हृदय अविच्छिन्न, अविभक्त और एक हो।' सामाजिक समरसता और असीम प्रेम के पावन पर्व रक्षाबन्धन की हार्दिक बधाई!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* History 3: Alexander and King Porus */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  ⚔️
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    सिकंदर और राजा पुरु (पोरस)
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    झेलम का युद्ध और वचन
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                इतिहासकारों के अनुसार, जब विश्वविजेता सिकंदर ने भारत पर आक्रमण किया, तो उसकी पत्नी रोक्साना ने पंजाब के शूरवीर राजा पुरु (पोरस) को राखी भेजकर अपने पति के प्राणों की रक्षा का वचन मांगा। युद्ध के मैदान में जब पोरस ने सिकंदर पर घातक वार करने के लिए अपनी तलवार उठाई, तो कलाई पर बंधी राखी देखकर उनके हाथ रुक गए। राजा पोरस ने युद्ध हारना स्वीकार किया किन्तु राखी का वचन नहीं तोड़ा।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "राजा पोरस और रोक्साना के ऐतिहासिक रक्षा-वचन की तरह, मैं हर परिस्थिति में अपने प्राणों से बढ़कर आपकी रक्षा और सम्मान की प्रतिज्ञा करता हूँ। हैप्पी रक्षाबंधन!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* History 4: Jain Tradition & Vishnu Kumar Muni */}
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-grad-gold flex items-center justify-center text-xl shadow-glow-sm">
                  ☸️
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-foreground">
                    जैन परम्परा: विष्णुकुमार मुनि आख्यान
                  </h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    700 मुनियों की रक्षा
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                जैन धर्म में रक्षाबन्धन का दिन आत्म-त्याग और रक्षा का महान दिवस माना जाता है। हस्तिनापुर में जब दुष्ट मन्त्री बलि ने 700 दिगम्बर जैन मुनियों को जीवित जलाने का महाषड्यन्त्र रचा, तब मुनि विष्णुकुमार ने वामन रूप धरकर मुनियों के प्राणों की रक्षा की। इसी उपलक्ष्य में जैन समुदाय श्रावण पूर्णिमा को रक्षाबन्धन के रूप में मनाता है, जिसमें सूत का डोरा बाँधकर धर्म और समाज की रक्षा का संकल्प लिया जाता है।
              </p>
            </div>
            <button
              onClick={() =>
                handleUseInCard(
                  "जैन परम्परा के पावन रक्षा-पर्व की तरह, यह रक्षासूत्र आपके जीवन में धर्म, त्याग, करुणा और सत्य की रक्षा का संबल बने। जय जिनेन्द्र एवं शुभ रक्षाबन्धन!"
                )
              }
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 border-t border-amber-500/15"
            >
              <span>यह शुभकामना कार्ड में लगाएँ</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* ── TAB 4: REGIONAL PAN-INDIAN TRADITIONS ── */}
      {activeTab === "regional" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-spring-in">
          {[
            {
              title: "नारियल पूर्णिमा (Nariyal Purnima)",
              region: "महाराष्ट्र, गोवा एवं पश्चिमी तटीय भारत",
              icon: "🥥",
              desc: "तटीय मछुआरा समाज समुद्र देव (वरुण) को सुनहरे नारियल अर्पित करता है। सावन की पूर्णिमा के साथ वर्षा ऋतु का ज्वार शांत होता है और समुद्र में नौकायन पुनः प्रारम्भ होता है। बहनें भाइयों को नारियल की मिठाई खिलाकर राखी बाँधती हैं।",
            },
            {
              title: "कजरी पूर्णिमा (Kajari Purnima)",
              region: "मध्य प्रदेश, उत्तर प्रदेश एवं छत्तीसगढ़",
              icon: "🌾",
              desc: "श्रावण पूर्णिमा पर महिलाएँ जौ और गेहूँ की छोटी बालियाँ (भुजरियाँ/भोजली) अपने कानों और पूजा में लगाती हैं। अच्छी फसल और पारिवारिक सुख-शांति की कामना के साथ भाई-बहनों का मिलन होता है।",
            },
            {
              title: "श्रावणी / अवनी अवित्तम (Upakarma)",
              region: "तमिलनाडु, केरल, कर्नाटक व आन्ध्र प्रदेश",
              icon: "🧵",
              desc: "दक्षिण भारत में इस दिन ब्राह्मण एवं वैदिक विद्यार्थी पवित्र यज्ञोपवीत (जनेऊ) का नवीनीकरण करते हैं, जिसे उपाकर्म कहा जाता है। इसे वेदों के स्वाध्याय और ब्रह्मचर्य के संकल्प का पवित्र दिन माना जाता है।",
            },
            {
              title: "सलूनो एवं रक्षासूत्र (Saluno)",
              region: "हरियाणा, राजस्थान एवं पंजाब",
              icon: "🌾",
              desc: "उत्तर भारत के ग्रामीण अंचलों में रक्षाबन्धन को सलूनो कहा जाता है। इस दिन पुरोहित यजमानों को, और बहनें भाइयों के साथ-साथ परिवार के सम्मानीय जनों को रक्षासूत्र बाँधकर उनका आशीर्वाद प्राप्त करती हैं।",
            },
            {
              title: "घेवर एवं पारम्परिक मिष्ठान्न",
              region: "राजस्थान, दिल्ली एवं ब्रज क्षेत्र",
              icon: "🍯",
              desc: "सावन मास का विशेष मिष्ठान्न 'घेवर' विशेष रूप से रक्षाबन्धन के दिन भाई-बहन के उपहार का अनिवार्य अंग है। इसके साथ ही शकरपारे, नमकपारे, घुघनी और खीर-पूरी से उत्सव का आनंद दोगुना होता है।",
            },
            {
              title: "पर्यावरण एवं वृक्ष रक्षाबन्धन",
              region: "उत्तराखण्ड, हिमाचल एवं आधुनिक भारत",
              icon: "🌳",
              desc: "चिपको आन्दोलन की प्रेरणा से आज कई सामाजिक संगठन और विद्यार्थी वनों और वृक्षों की कलाई पर रक्षासूत्र बाँधकर प्रकृति और पर्यावरण की रक्षा का पुनीत संकल्प लेते हैं।",
            },
          ].map((reg) => (
            <div key={reg.title} className="glass-heavy glass-shine-top rounded-3xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-2xl">{reg.icon}</span>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-foreground">{reg.title}</h4>
                    <span className="text-[10px] text-primary font-semibold">{reg.region}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{reg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

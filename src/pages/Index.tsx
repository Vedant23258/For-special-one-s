140
  83
  import { useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState<boolean[]>([false, false, false, false, false]);
  const [showMessage, setShowMessage] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState([5]);
  const [yesNoChoice, setYesNoChoice] = useState<string | null>(null);
  const [revealedText, setRevealedText] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const totalLevels = 5;

  const messages = [
    {
      title: "Tum ho toh sab kuch soft lagta hai",
      text: "Kabhi realize kiya hai, tumhari ek chhoti si smile bhi pura mood change kar deti hai? Normal sa din bhi special lagne lagta hai sirf isliye kyunki <b>tum us din ka part ho</b>.",
    },
    {
      title: "Sabse zyada cute kya hai?",
      text: "Jab tum serious hoke bhi cute lagti ho, woh random moments, thoda sa nakhra, thoda sa care. Ye sab mila ke ek hi word banta hai: <b>irresistible</b>.",
    },
    {
      title: "Tum mera favourite notification ho",
      text: "Phone par itni saari chats hoti hain, par jis naam pe sabse zyada nazar rukti hai, woh tum ho. Baaki log 'later' ke liye hote hain, <b>tum always 'abhi' ke liye</b>.",
    },
    {
      title: "Tumse baat karke lagta hai sab sahi hai",
      text: "Agar din thoda weird ho, toh tumse ek 'hi' bhi reset button jaisa lagta hai. Tum ho toh bina reason ke bhi khushi mil jati hai – bas aise hi.",
    },
    {
      title: "Bas ek simple si baat",
      text: "Bohot saare log milte rehte hain, lekin har koi 'apna' nahi lagta. Tum un rare logo mein se ho jo bina effort ke bhi dil ke close lagte ho. Sach bolo toh, duniya waise bhi chal jayegi… par <b>tumhare bina itni acchi kabhi nahi lagegi</b>. 💗",
    },
  ];

  useEffect(() => {
    // Generate initial floating hearts for level 0
    if (currentLevel === 0) {
      const hearts = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
      }));
      setFloatingHearts(hearts);
    }
  }, [currentLevel]);

  const handleHeartClick = (id: number) => {
    setHeartCount((prev) => prev + 1);
    setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    createSparkle();
    
    if (heartCount + 1 >= 8) {
      completeLevel();
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setTimeout(() => {
      completeLevel();
    }, 300);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (value[0] >= 8) {
      setTimeout(() => {
        completeLevel();
      }, 500);
    }
  };

  const handleYesNoChoice = (choice: string) => {
    setYesNoChoice(choice);
    setTimeout(() => {
      completeLevel();
    }, 300);
  };

  const handleRevealText = () => {
    setRevealedText(true);
    setTimeout(() => {
      completeLevel();
    }, 800);
  };

  const completeLevel = () => {
    const newCompleted = [...levelCompleted];
    newCompleted[currentLevel] = true;
    setLevelCompleted(newCompleted);
    setShowMessage(true);
    createSparkle();
    createSparkle();
  };

  const nextLevel = () => {
    if (currentLevel < totalLevels - 1) {
      setCurrentLevel(currentLevel + 1);
      setShowMessage(false);
      setHeartCount(0);
      setSelectedOption(null);
      setSliderValue([5]);
      setYesNoChoice(null);
      setRevealedText(false);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
      setShowMessage(levelCompleted[currentLevel - 1]);
    }
  };

  const createSparkle = () => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center p-4">
      {/* Add a simple indicator that the app is loading */}
      <div id="app-loaded" style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999, color: 'red', fontSize: '20px' }}>
        
      </div>
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[4%] w-64 h-64 bg-pink rounded-full blur-[90px] opacity-60 animate-float" />
        <div className="absolute bottom-[8%] right-[8%] w-72 h-72 bg-violet rounded-full blur-[100px] opacity-50 animate-float-delayed" />
        <div className="absolute top-[55%] left-[-5%] w-60 h-60 bg-cyan rounded-full blur-[80px] opacity-40 animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
        >
          <Sparkles className="w-6 h-6 text-pink" />
        </div>
      ))}

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-3 px-2">
          <div className="text-sm opacity-70">For Someone Special ✨</div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full border border-border/30 bg-black/20 hover:bg-black/40"
              onClick={prevLevel}
              disabled={currentLevel === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full border border-border/30 bg-black/20 hover:bg-black/40"
              onClick={nextLevel}
              disabled={currentLevel === totalLevels - 1 || !levelCompleted[currentLevel]}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Level Indicator Dots */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex gap-2">
            {Array.from({ length: totalLevels }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === currentLevel
                    ? "w-8 bg-gradient-romantic shadow-glow"
                    : "w-2 bg-white/25"
                )}
              />
            ))}
          </div>
          <div className="text-xs opacity-60">Level {currentLevel + 1}/{totalLevels}</div>
        </div>

        {/* Glass Card */}
        <div className="relative bg-glass/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-card-glow p-6 md:p-8 min-h-[420px] overflow-hidden">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute inset-[-60px] bg-gradient-neon opacity-30 blur-2xl animate-spin-slow" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-wider opacity-70 mb-1">hey, sunshine</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-romantic bg-clip-text text-transparent">
              For Someone Special
            </h1>
            <p className="text-base opacity-80 mb-6">This little space on the internet is just for you 💖</p>

            {/* Level Content */}
            <div className="min-h-[240px]">
              {/* Level 1: Tap Hearts */}
              {currentLevel === 0 && (
                <div className="animate-slide-in">
                  <div className="inline-flex items-center gap-2 bg-gradient-glow rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-pink rounded-full animate-pulse-glow" />
                    <span className="text-sm">Tap the floating hearts</span>
                  </div>
                  <div className="relative h-56 bg-muted/20 rounded-2xl border border-border/30 overflow-hidden">
                    {floatingHearts.map((heart) => (
                      <button
                        key={heart.id}
                        onClick={() => handleHeartClick(heart.id)}
                        className="absolute group cursor-pointer animate-pulse-glow"
                        style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                      >
                        <Heart className="w-8 h-8 text-pink fill-pink group-hover:scale-125 transition-transform" />
                      </button>
                    ))}
                    <div className="absolute bottom-4 right-4 text-sm opacity-70">
                      {heartCount} / 8 hearts collected
                    </div>
                  </div>
                  {showMessage && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/30 animate-slide-in">
                      <h3 className="text-xl font-semibold mb-2">{messages[0].title}</h3>
                      <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: messages[0].text }} />
                    </div>
                  )}
                </div>
              )}

              {/* Level 2: Pick Option */}
              {currentLevel === 1 && (
                <div className="animate-slide-in">
                  <div className="inline-flex items-center gap-2 bg-gradient-glow rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-pink rounded-full animate-pulse-glow" />
                    <span className="text-sm">Tumhare baare mein sabse special kya hai?</span>
                  </div>
                  <div className="space-y-3">
                    {["Your smile ✨", "Your voice 🎵", "Your whole vibe 💫"].map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        className={cn(
                          "w-full p-4 rounded-xl border transition-all duration-300",
                          selectedOption === i
                            ? "bg-gradient-romantic border-pink shadow-glow scale-105"
                            : "bg-muted/20 border-border/30 hover:border-pink/50 hover:bg-muted/30"
                        )}
                      >
                        <span className="text-base font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                  {showMessage && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/30 animate-slide-in">
                      <h3 className="text-xl font-semibold mb-2">{messages[1].title}</h3>
                      <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: messages[1].text }} />
                    </div>
                  )}
                </div>
              )}

              {/* Level 3: Slider */}
              {currentLevel === 2 && (
                <div className="animate-slide-in">
                  <div className="inline-flex items-center gap-2 bg-gradient-glow rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-pink rounded-full animate-pulse-glow" />
                    <span className="text-sm">Kitna special lagti ho tum?</span>
                  </div>
                  <div className="p-6 bg-muted/20 rounded-2xl border border-border/30">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                        {sliderValue[0]}/10
                      </div>
                      {sliderValue[0] >= 8 && (
                        <div className="text-sm text-pink mt-2 animate-pulse-glow">Perfect! 💖</div>
                      )}
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs opacity-60 mt-2">
                      <span>Not much</span>
                      <span>Can't put into words</span>
                    </div>
                  </div>
                  {showMessage && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/30 animate-slide-in">
                      <h3 className="text-xl font-semibold mb-2">{messages[2].title}</h3>
                      <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: messages[2].text }} />
                    </div>
                  )}
                </div>
              )}

              {/* Level 4: Yes/No */}
              {currentLevel === 3 && (
                <div className="animate-slide-in">
                  <div className="inline-flex items-center gap-2 bg-gradient-glow rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-pink rounded-full animate-pulse-glow" />
                    <span className="text-sm">A simple question</span>
                  </div>
                  <div className="p-6 bg-muted/20 rounded-2xl border border-border/30">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                      Kya tumhe pata hai tum kitni important ho?
                    </h3>
                    <div className="flex gap-4 justify-center">
                      {["Haan 💗", "Nahi pata 🤔"].map((choice, i) => (
                        <Button
                          key={i}
                          onClick={() => handleYesNoChoice(choice)}
                          className={cn(
                            "text-base px-8 py-6 transition-all duration-300",
                            yesNoChoice === choice
                              ? "bg-gradient-romantic shadow-glow scale-110"
                              : "bg-muted hover:bg-muted/80"
                          )}
                        >
                          {choice}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {showMessage && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/30 animate-slide-in">
                      <h3 className="text-xl font-semibold mb-2">{messages[3].title}</h3>
                      <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: messages[3].text }} />
                    </div>
                  )}
                </div>
              )}

              {/* Level 5: Final Reveal */}
              {currentLevel === 4 && (
                <div className="animate-slide-in">
                  <div className="inline-flex items-center gap-2 bg-gradient-glow rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-pink rounded-full animate-pulse-glow" />
                    <span className="text-sm">Last level, promise</span>
                  </div>
                  <div className="p-6 bg-muted/20 rounded-2xl border border-border/30 text-center">
                    <div className="mb-6">
                      <Heart className="w-16 h-16 mx-auto text-pink fill-pink animate-heart-beat" />
                    </div>
                    {!revealedText ? (
                      <>
                        <h3 className="text-2xl font-semibold mb-4">
                          There's something I want you to know...
                        </h3>
                        <Button
                          onClick={handleRevealText}
                          className="bg-gradient-romantic shadow-glow hover:scale-105 transition-transform text-base px-8 py-6"
                        >
                          <Heart className="w-5 h-5 mr-2" />
                          Click to reveal
                        </Button>
                      </>
                    ) : (
                      <div className="animate-slide-in space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                          {messages[4].title}
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: messages[4].text }} />
                        <div className="pt-4">
                          <div className="inline-flex items-center gap-2 text-sm">
                            <span className="opacity-70">— With all my heart,</span>
                            <span className="font-semibold bg-gradient-romantic bg-clip-text text-transparent">Vedant</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Hint */}
            {levelCompleted[currentLevel] && currentLevel < totalLevels - 1 && (
              <div className="mt-6 text-center">
                <Button
                  onClick={nextLevel}
                  className="bg-gradient-romantic shadow-glow hover:scale-105 transition-transform text-base px-6 py-3"
                >
                  Continue to Next Level
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="text-center mt-4 text-xs opacity-60">
          Made with 💗 for someone special
        </div>
      </div>
    </div>
  );
};

export default Index;

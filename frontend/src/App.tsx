import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import html2canvas from "html2canvas";


// --- Types ---
type Page = "home" | "aboutProject" | "aboutMe" | "contact" | "login" | "learn" | "howToUse";

interface MenuBarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

interface LogItem {
  time: string;
  gesture: string;
}

interface Bookmark {
  label: string;
  url: string;
}

const COOLDOWN = 800;
// --- MenuBar Component ---
const MenuBar: React.FC<MenuBarProps> = ({ currentPage, setCurrentPage }) => {
  const leftItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "About Project", page: "aboutProject" },
    { label: "About Me", page: "aboutMe" },
    { label: "Learn", page: "learn" },
     { label: "How to Use", page: "howToUse" },
    { label: "Contact", page: "contact" },
  ];
  

  const rightItems: { label: string; page: Page }[] = [{ label: "Login", page: "login" }];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-sm shadow-md px-8 py-4 flex justify-between items-center">
      <div className="flex gap-8">
        {leftItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 ${currentPage === item.page
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-400/30"
                : "bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950 hover:shadow-lg hover:shadow-emerald-400/20"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>
        


        {rightItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 ${currentPage === item.page
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-400/30"
                : "bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950 hover:shadow-lg hover:shadow-emerald-400/20"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Homepage ---
const HomePage: React.FC = () => {
  const featureList = [
    { title: "Touch-Free Navigation", desc: "Browse pages without clicking, using only hand gestures." },
    { title: "AI-Powered Detection", desc: "MediaPipe & TensorFlow.js ensure accurate gesture recognition." },
    { title: "Real-Time Feedback", desc: "Logs and live webcam preview show detected gestures instantly." },
    { title: "Customizable", desc: "Add new gestures or actions easily." },
  ];

  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-slate-900/90 rounded-2xl shadow-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-rose-900 via-rose-400 to-sky-500 bg-clip-text text-transparent mb-6">
          Gesture-Driven Interactive Web System
        </h1>
        <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
          Navigate the web using{" "}
          <span className="text-emerald-300 font-semibold">AI-powered hand gestures</span> in real-time.
          MediaPipe Hands & TensorFlow.js enable a touch-free web browsing experience.
        </p>
      </section>
      <section className="overflow-hidden py-16 relative group">
        <div className="flex gap-6 animate-slideSlow group-hover:pause">
          {featureList.concat(featureList).map((feature, i) => (
            <div key={i} className="bg-slate-800 p-10 rounded-2xl shadow-lg min-w-[380px] flex-shrink-0">
              <h3 className="text-4xl font-semibold mb-3 text-emerald-400">{feature.title}</h3>
              <p className="text-xl text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ================= A. Full-Screen Interactive HowTo Page ================= */
/* ================= B. Onboarding Modal (Wizard) ================= */

/* ================= end B ================= */



// --- Login / Sign In Form ---
const LoginSignInForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative z-10 flex flex-col gap-6">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-3 text-xl rounded-l-full font-bold ${isLogin ? "bg-emerald-400 text-slate-950 shadow-lg" : "bg-slate-700 text-slate-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-3 text-xl rounded-r-full font-bold ${!isLogin ? "bg-emerald-400 text-slate-950 shadow-lg" : "bg-slate-700 text-slate-200"
          }`}
        >
          Sign In
        </button>
      </div>

      {/* Form */}
      {isLogin ? (
        <form className="flex flex-col gap-6">
          <label htmlFor="username" className="text-xl font-semibold text-slate-200">
            Username:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username"
            className="p-4 text-lg rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
            required
          />

          <label htmlFor="password" className="text-xl font-semibold text-slate-200">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            className="p-4 text-lg rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
            required
          />

          <button
            type="submit"
            className="mt-6 px-8 py-4 text-xl bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full font-bold shadow-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      ) : (
        <form className="flex flex-col gap-6">
          <label htmlFor="newUsername" className="text-xl font-semibold text-slate-200">
            Username:
          </label>
          <input
            type="text"
            id="newUsername"
            placeholder="Choose a Username"
            className="p-4 text-lg rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
            required
          />

          <label htmlFor="email" className="text-xl font-semibold text-slate-200">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            className="p-4 text-lg rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
            required
          />

          <label htmlFor="newPassword" className="text-xl font-semibold text-slate-200">
            Password:
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Choose a Password"
            className="p-4 text-lg rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
            required
          />

          <button
            type="submit"
            className="mt-6 px-8 py-4 text-xl bg-gradient-to-r from-green-400 to-blue-500 rounded-full font-bold shadow-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

const FingerCursor: React.FC<{ x: number; y: number; clicking?: boolean }> = ({ x, y, clicking }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: "translate(-10%, -20%)", // thoda upar-left, jaise real mouse
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Mouse pointer triangle */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "14px solid white",
          borderTop: "14px solid transparent",
          borderBottom: "14px solid transparent",
          filter: clicking ? "drop-shadow(0 0 8px rgba(34,197,94,0.9))" : "drop-shadow(0 0 4px rgba(0,0,0,0.7))",
        }}
      />
      {/* Chhota circle for hover feedback */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "999px",
          marginTop: 2,
          marginLeft: 4,
          border: clicking ? "2px solid #22c55e" : "2px solid #e5e7eb",
          background: clicking ? "rgba(34,197,94,0.3)" : "rgba(15,23,42,0.8)",
        }}
      />
    </div>
  );
};



// ===== Keyboard Layout =====
const KEY_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["SPACE", "BACKSPACE", "ENTER"],
];

type KeyBox = {
  key: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const generateKeyBoxes = (): KeyBox[] => {
  const rowCount = KEY_ROWS.length;
  const rowHeight = 1 / rowCount;
  const boxes: KeyBox[] = [];

  KEY_ROWS.forEach((row, rowIndex) => {
    const keyCount = row.length;
    const keyWidth = 1 / keyCount;
    const y1 = rowIndex * rowHeight;
    const y2 = y1 + rowHeight;

    row.forEach((key, keyIndex) => {
      const x1 = keyIndex * keyWidth;
      const x2 = x1 + keyWidth;
      boxes.push({ key, x1, x2, y1, y2 });
    });
  });

  return boxes;
};

const KEY_BOXES = generateKeyBoxes();

const getKeyAtPosition = (fingerX: number, fingerY: number): string | null => {
  for (const box of KEY_BOXES) {
    if (fingerX >= box.x1 && fingerX <= box.x2 && fingerY >= box.y1 && fingerY <= box.y2) {
      return box.key;
    }
  }
  return null;
};

const smoothPoint = (
  history: Array<{ x: number; y: number }>,
  newPt: { x: number; y: number },
  window = 6
) => {
  history.push(newPt);
  if (history.length > window) history.shift();

  const sum = history.reduce(
    (acc, point) => ({
      x: acc.x + point.x,
      y: acc.y + point.y,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / history.length,
    y: sum.y / history.length,
  };
};

const KeyButton: React.FC<{
  label: string;
  hovered?: boolean;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, hovered, active, onClick }) => {
  const isSpace = label === "␣";
  const isEnter = label === "ENTER";

  return (
    <button
      onClick={onClick}
      className={
        "select-none border rounded-xl bg-black text-white font-semibold " +
        (isSpace ? "px-12 py-4 " : isEnter ? "px-10 py-4 " : "px-6 py-4 ") +
        (active
          ? "border-green-400 scale-110 shadow-[0_0_25px_rgba(34,197,94,0.9)] "
          : hovered
          ? "border-red-400 bg-red-500/40 scale-105 shadow-[0_0_18px_rgba(248,113,113,0.9)] "
          : "border-gray-700 ") +
        "transition-transform text-lg md:text-2xl"
      }
    >
      {label}
    </button>
  );
};

/* ================= A. Full-Screen Interactive HowTo Page ================= */
const HowToFullPage: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Right Hand — Navigation", text: "Open Palm → Home; Swipe Left → About Project; Swipe Right → Contact; Swipe Up → About Me; Swipe Down → Login. Move index finger to control cursor. Pinch to click." },
    { title: "Left Hand — Bookmarks & Screenshot", text: "Show 1–5 fingers to open Bookmark 1–5. Close all fingers (fist) to take a screenshot." },
    { title: "Scrolling & Mouse", text: "Move your hand up/down for smooth scrolling. Pinch (thumb+index) acts as left-click. Keep hand steady & ensure good lighting." },
    { title: "Gesture Keyboard", text: "Open the Gesture Keyboard from Bookmarks panel. Hover over keys with index and hold to type; ENTER triggers Google search." },
    { title: "Troubleshooting", text: "If gestures misbehave: allow camera, increase lighting, keep background simple, move your hand away for 1s to reset." },
  ];

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center rounded-2xl max-w-6xl mx-auto shadow-2xl animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-extrabold text-emerald-300">How to Use — Interactive Guide</h1>
          <div className="flex gap-2">
            {onBack && (
              <button onClick={onBack} className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200">Back</button>
            )}
            <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-4 py-2 rounded-full bg-emerald-500 text-slate-900 font-semibold">Top</button>
          </div>
        </div>

        {/* Steps pagination + visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* left: vertical progress */}
          <div className="hidden md:block">
            <ol className="space-y-6 text-left">
              {steps.map((s, i) => (
                <li key={i} className={`p-4 rounded-2xl border ${i === step ? "border-emerald-400 bg-slate-800/60 shadow-lg" : "border-slate-700 bg-slate-900/30"}`}
                    onClick={() => setStep(i)}>
                  <div className="text-emerald-300 font-semibold text-lg">Step {i + 1}</div>
                  <div className="text-slate-200 font-bold text-xl mt-1">{s.title}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* center: main card */}
          <div className="md:col-span-2 bg-slate-900/70 p-8 rounded-3xl shadow-xl border border-slate-700">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold text-emerald-300 mb-3">{steps[step].title}</h2>
                <p className="text-xl text-slate-300 leading-relaxed mb-6">{steps[step].text}</p>

                {/* actionable quick tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <div className="text-slate-400 text-sm">Gesture</div>
                    <div className="text-white font-semibold">Pinch = Click</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <div className="text-slate-400 text-sm">Distance</div>
                    <div className="text-white font-semibold">Keep 30–40 cm from camera</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <div className="text-slate-400 text-sm">Lighting</div>
                    <div className="text-white font-semibold">Use even daylight, avoid backlight</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <div className="text-slate-400 text-sm">Reset</div>
                    <div className="text-white font-semibold">Move hand away 1s to reset</div>
                  </div>
                </div>

                {/* demo controls */}
                <div className="flex gap-3">
                  <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200">Prev</button>
                  <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="px-4 py-2 rounded-full bg-emerald-500 text-slate-900 font-semibold">Next</button>
                  <button onClick={() => { navigator.clipboard?.writeText("Tip: Try pinch near a button to click"); alert("Quick tip copied to clipboard"); }} className="px-4 py-2 rounded-full border border-slate-700 text-slate-200">Copy Tip</button>
                </div>
              </div>

              {/* right: live preview card (webcam + small legend) */}
              <div className="w-48 shrink-0">
                <div className="bg-black rounded-xl overflow-hidden border border-slate-700 mb-3">
                  {/* small live webcam preview (reuse your Webcam component) */}
                  <Webcam
                    audio={false}
                    className="w-full h-32 object-cover"
                    videoConstraints={{ width: 320, height: 240, facingMode: "user" }}
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400">Live Preview</div>
                  <div className="text-white font-medium">Index = Cursor</div>
                  <div className="text-slate-400 text-sm mt-1">Pinch near element to click</div>
                </div>
              </div>
            </div>

            {/* bottom: visual icon/timeline */}
            <div className="mt-8">
              <div className="flex items-center gap-4 justify-center">
                {steps.map((_, i) => (
                  <button key={i} onClick={() => setStep(i)} className={`w-3 h-3 rounded-full ${i === step ? "bg-emerald-400" : "bg-slate-700"}`}/>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
/* ================= end A ================= */


const GestureKeyboardUI: React.FC<{
  hoveredKey: string | null;
  activeKey: string | null;
  onPress: (k: string) => void;
}> = ({ hoveredKey, activeKey, onPress }) => {
  return (
    <div className="w-full max-w-3xl p-4 bg-black rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-gray-700 mx-auto">
      {KEY_ROWS.map((row, rIdx) => (
        <div key={rIdx} className="flex justify-center gap-2 mb-2">
          {row.map((k) => (
            <KeyButton
              key={k}
              label={k === "SPACE" ? "␣" : k === "BACKSPACE" ? "⌫" : k === "ENTER" ? "ENTER" : k}
              hovered={hoveredKey === k}
              active={activeKey === k}
              onClick={() => onPress(k)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Keyboard page-style panel
const GestureKeyboardPanel: React.FC<{
  onClose?: () => void;
}> = ({ onClose }) => {
  const [typedText, setTypedText] = useState<string>("");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const webcamRef = useRef<Webcam | null>(null);
  const smoothHistory = useRef<Array<{ x: number; y: number }>>([]);

  const lastPressRef = useRef<number>(0);
  const lastKeyRef = useRef<string | null>(null);
  const keyHoverStartRef = useRef<number>(0);

  const handlePressRef = useRef<(k: string) => void>(() => {});

  const HOLD_TIME_DEFAULT = 900;
  const HOLD_TIME_ENTER = 100;
  const COOLDOWN_LOCAL = 800;

  const handlePress = useCallback(
    (key: string) => {
      if (key === "ENTER") {
        const query = typedText.trim();
        if (query.length > 0) {
          const url =
            "https://www.google.com/search?q=" + encodeURIComponent(query);
          window.location.href = url;
        }
        return;
      }

      setTypedText((prev) => {
        if (key === "BACKSPACE") return prev.slice(0, -1);
        if (key === "SPACE") return prev + " ";
        return prev + key;
      });
    },
    [typedText]
  );

  useEffect(() => {
    handlePressRef.current = handlePress;
  }, [handlePress]);

useEffect(() => {
  let isMounted = true;
  let hands: any = null;
  let camera: any = null;

  (async () => {
    try {
      const mp = await import("@mediapipe/hands");
      const camUtils = await import("@mediapipe/camera_utils");

      if (!isMounted) return;

      hands = new mp.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.6,
      });

      hands.onResults((results: any) => {
        if (
          !results ||
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0
        ) {
          setHoveredKey(null);
          setActiveKey(null);
          lastKeyRef.current = null;
          keyHoverStartRef.current = 0;
          return;
        }

        const landmarks = results.multiHandLandmarks[0];
        const tip = landmarks[8];

        const smoothed = smoothPoint(smoothHistory.current, {
          x: tip.x,
          y: tip.y,
        });

        const fingerX = 1 - smoothed.x;
        const fingerY = smoothed.y;

        const keyUnderFinger = getKeyAtPosition(fingerX, fingerY);
        const now = Date.now();

        if (!keyUnderFinger) {
          setHoveredKey(null);
          setActiveKey(null);
          lastKeyRef.current = null;
          keyHoverStartRef.current = 0;
          return;
        }

        if (lastKeyRef.current !== keyUnderFinger) {
          lastKeyRef.current = keyUnderFinger;
          keyHoverStartRef.current = now;
          setHoveredKey(keyUnderFinger);
          setActiveKey(null);
          return;
        }

        const sinceHover = now - keyHoverStartRef.current;
        setHoveredKey(keyUnderFinger);

        const isEnter = keyUnderFinger === "ENTER";
        const requiredHold = isEnter ? HOLD_TIME_ENTER : HOLD_TIME_DEFAULT;

        if (
          sinceHover > requiredHold &&
          (isEnter || now - lastPressRef.current > COOLDOWN_LOCAL)
        ) {
          lastPressRef.current = now;
          setActiveKey(keyUnderFinger);
          setTimeout(() => {
            setActiveKey((prev) => (prev === keyUnderFinger ? null : prev));
          }, 200);

          handlePressRef.current(keyUnderFinger);
        }
      });

      // ✅ video ready hone ka wait
      const startCamera = () => {
        const videoEl = webcamRef.current?.video as HTMLVideoElement | null;
        if (!videoEl) {
          if (!isMounted) return;
          requestAnimationFrame(startCamera); // thodi der baad phir try
          return;
        }

        camera = new camUtils.Camera(videoEl, {
          onFrame: async () => {
            const v = webcamRef.current?.video as HTMLVideoElement | null;
            if (!v) return; // safety guard
            await hands.send({ image: v });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      };

      startCamera();
    } catch (err) {
      console.error("Failed to load MediaPipe Hands (keyboard)", err);
    }
  })();

  return () => {
    isMounted = false;
    try {
      if (hands) hands.close();
      if (camera && camera.stop) camera.stop();
    } catch {
      // ignore
    }
  };
}, []);


  return (
    <section className="py-16 px-6 bg-slate-900/90 rounded-2xl shadow-lg mb-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-300">
          Gesture Controlled Google Keyboard
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-slate-800 text-slate-200 text-sm hover:bg-slate-700 border border-slate-600"
          >
            Back
          </button>
        )}
      </div>

      {/* Visible webcam on this page */}
      <div className="mb-6 flex justify-center">
        <div className="border border-slate-700 rounded-xl overflow-hidden bg-black">
          <Webcam
            audio={false}
            ref={webcamRef}
            className="w-[320px] h-[240px] object-cover"
            videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
          />
        </div>
      </div>

      <GestureKeyboardUI
        hoveredKey={hoveredKey}
        activeKey={activeKey}
        onPress={handlePress}
      />

      <div className="mt-5 bg-black/80 border border-gray-700 p-4 rounded-2xl text-white">
        <div className="text-sm text-gray-300 mb-1">Google Query</div>
        <div className="min-h-[48px] border border-gray-600 rounded-lg p-2 text-lg bg-slate-950">
          {typedText || (
            <span className="text-gray-500">
              Type with gestures, then hover on ENTER for a moment to search on Google...
            </span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setTypedText("")}
            className="px-3 py-1 rounded-lg border border-gray-600 bg-black hover:bg-slate-800 text-sm"
          >
            Clear
          </button>
          <button
            onClick={() => {
              const query = typedText.trim();
              if (query.length > 0) {
                const url =
                  "https://www.google.com/search?q=" +
                  encodeURIComponent(query);
                window.location.href = url;
              }
            }}
            className="px-3 py-1 rounded-lg border border-emerald-500 bg-emerald-600/80 hover:bg-emerald-500 text-black font-semibold text-sm"
          >
            Search on Google
          </button>
          
        </div>

        <div className="mt-2 text-[11px] text-gray-400 space-y-1">
          <p>• Red highlight = current key under finger.</p>
          <p>• Normal keys: ≈ {HOLD_TIME_DEFAULT} ms hold to press.</p>
          <p>• ENTER: ≈ {HOLD_TIME_ENTER} ms hold to trigger Google search.</p>
        </div>
      </div>
    </section>
  );
};

/* ====================== MAIN APP (website + keyboard) ======================= */

const App: React.FC = () => {
  // const [showOnboarding, setShowOnboarding] = useState(false);



  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [lastGesture, setLastGesture] = useState<string>("None");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [lastGestureTime, setLastGestureTime] = useState(0);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { label: "Google", url: "https://www.google.com" },
    { label: "YouTube", url: "https://www.youtube.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com" },
    { label: "VIPS-TC", url: "https://vipstc.edu.in" },
  ]);

  const [newBookmarkLabel, setNewBookmarkLabel] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [isBookmarkPanelOpen, setIsBookmarkPanelOpen] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [showKeyboardScreen, setShowKeyboardScreen] = useState(false);

  const [cursorX, setCursorX] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState<number | null>(null);

  const [isClicking, setIsClicking] = useState(false);
const lastScrollTimeRef = useRef(0);
const lastFingerYRef = useRef<number | null>(null);
const SCROLL_COOLDOWN = 80;
const SCROLL_SENSITIVITY = 400;      // speed (need ho to baad me change kar lena)

const triggerScreenshot = () => {
  const target = document.body; // chahe to koi specific div bhi de sakti ho

  html2canvas(target).then((canvas) => {
    const link = document.createElement("a");
    link.download = `gesture-screenshot-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
};



  const handleGesture = (gesture: string) => {
    const now = Date.now();
    if (now - lastGestureTime < COOLDOWN) return;
    setLastGestureTime(now);

    setLastGesture(gesture);
    setLogs((prev) => [{ time: new Date().toLocaleTimeString(), gesture }, ...prev]);

    if (gesture.startsWith("BM_")) {
      const num = parseInt(gesture.split("_")[1], 10);
      const index = num - 1;

      if (index >= 0 && index < bookmarks.length) {
        const bm = bookmarks[index];
        if (bm && bm.url) {
          window.open(bm.url, "_blank");
        }
      }

      return;
    }

      if (gesture === "RIGHT_SCREENSHOT") {
    triggerScreenshot();
    return;
  }

    if (gesture === "RIGHT_PALM_OPEN") setCurrentPage("home");
    if (gesture === "RIGHT_SWIPE_LEFT") setCurrentPage("aboutProject");
    if (gesture === "RIGHT_SWIPE_RIGHT") setCurrentPage("contact");
    if (gesture === "RIGHT_SWIPE_UP") setCurrentPage("aboutMe");
    if (gesture === "RIGHT_SWIPE_DOWN") setCurrentPage("login");
  };

  const detectPalmOpen = (landmarks: any[]) => {
    if (!landmarks || landmarks.length === 0) return false;
    const tips = [8, 12, 16, 20];
    return tips.every((tip) => landmarks[tip].y < landmarks[tip - 2].y);
  };

  const detectSwipe = (() => {
    let prevX: number | null = null;
    let prevY: number | null = null;
    return (landmarks: any[]) => {
      if (!landmarks || landmarks.length === 0) return null;
      const cx = landmarks[0].x;
      const cy = landmarks[0].y;
      let dir: "LEFT" | "RIGHT" | "UP" | "DOWN" | null = null;

      if (prevX !== null && prevY !== null) {
        const dx = cx - prevX;
        const dy = cy - prevY;
        const threshold = 0.08;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > threshold) dir = "RIGHT";
          else if (dx < -threshold) dir = "LEFT";
        } else {
          if (dy > threshold) dir = "DOWN";
          else if (dy < -threshold) dir = "UP";
        }
      }

      prevX = cx;
      prevY = cy;
      return dir;
    };
  })();

  const detectBookmarkGesture = (landmarks: any[]): string | null => {
    if (!landmarks || landmarks.length === 0) return null;
    const tipPairs = [
      [8, 6],
      [12, 10],
      [16, 14],
      [20, 18],
    ];
    const extended = tipPairs.map(([tip, pip]) => landmarks[tip].y < landmarks[pip].y);
    const thumbOpen = landmarks[4].x < landmarks[2].x;
    let count = 0;
    if (thumbOpen) count++;
    extended.forEach((e) => {
      if (e) count++;
    });
    if (count >= 1 && count <= 5) {
      return `BM_${count}`;
    }
    return null;
  };

  // ---------------- Screenshot Gesture (all fingers close) ----------------
const detectScreenshotGesture = (landmarks: any[]): boolean => {
  if (!landmarks || landmarks.length === 0) return false;

  // finger tips
  const thumb = landmarks[4];
  const index = landmarks[8];
  const middle = landmarks[12];
  const ring = landmarks[16];
  const pinky = landmarks[20];

  // tips ke beech distance check
  const d = (a: any, b: any) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const dThumbIndex = d(thumb, index);
  const dIndexMiddle = d(index, middle);
  const dMiddleRing = d(middle, ring);
  const dRingPinky = d(ring, pinky);

  // saare close hone chahiye => sab distance chhote
  const CLOSE_THRESHOLD = 0.06; // agar zyada strict lage to 0.07/0.08 kar dena

  const allClose =
    dThumbIndex < CLOSE_THRESHOLD &&
    dIndexMiddle < CLOSE_THRESHOLD &&
    dMiddleRing < CLOSE_THRESHOLD &&
    dRingPinky < CLOSE_THRESHOLD;

  return allClose;
};



    useEffect(() => {
    if (!isCameraOn || showKeyboardScreen) return;
    if (!webcamRef.current?.video) return;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });

    hands.onResults((results: Results) => {
      const allHands = results.multiHandLandmarks;
      const allHandedness = results.multiHandedness;

      if (!allHands || allHands.length === 0) {
        setCursorX(null);
        setCursorY(null);
        return;
      }

      allHands.forEach((landmarks, i) => {
  const handedness = allHandedness[i]?.label; // "Right" / "Left"

  // ---------- 1) COMMON: Cursor from index finger (dono hands allowed) ----------
  const tip = landmarks[8]; // index finger
  const normX = 1 - tip.x;  // mirror flip
  const normY = tip.y;

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const pxX = normX * screenW;
  const pxY = normY * screenH;

  setCursorX(pxX);
  setCursorY(pxY);

   // ---------- 2) Scroll up/down (smooth, finger based) ----------
  const now = Date.now();

  if (now - lastScrollTimeRef.current > SCROLL_COOLDOWN) {
    const currentY = tip.y; // 0..1

    if (lastFingerYRef.current !== null) {
      const dyFinger = currentY - lastFingerYRef.current;

      // chhoti movement ignore
      if (Math.abs(dyFinger) > 0.01) {
        // dyFinger > 0  → haath niche → scroll DOWN
        // dyFinger < 0  → haath upar  → scroll UP
        window.scrollBy({
          top: dyFinger * SCROLL_SENSITIVITY,
          left: 0,
          behavior: "smooth",
        });

        lastScrollTimeRef.current = now;
      }
    }

    lastFingerYRef.current = currentY;
  }


  // ---------- 3) Pinch = click (thumb tip 4, index tip 8) ----------
  const thumbTip = landmarks[4];
  const pinchDist = Math.hypot(
    thumbTip.x - tip.x,
    thumbTip.y - tip.y
  );

  const isPinching = pinchDist < 0.04; // adjust threshold if needed

  if (isPinching) {
    if (!isClicking) {
      setIsClicking(true);
      const elem = document.elementFromPoint(pxX, pxY) as HTMLElement | null;
      if (elem) {
        elem.click();
      }
    }
  } else {
    setIsClicking(false);
  }

  // ---------- 4) Right hand = navigation gestures ----------
  if (handedness === "Right") {
  const tip = landmarks[8]; // index finger tip

  // ---- Cursor position (mouse pointer) ----
  const normX = 1 - tip.x; // mirror fix
  const normY = tip.y;

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const pxX = normX * screenW;
  const pxY = normY * screenH;

  setCursorX(pxX);
  setCursorY(pxY);

  // ---- Pinch = click (thumb 4 + index 8) ----
  const thumbTip = landmarks[4];
  const dx = thumbTip.x - tip.x;
  const dy = thumbTip.y - tip.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const isPinching = dist < 0.04; // sensitivity
  setIsClicking(isPinching);

  if (isPinching) {
    const elem = document.elementFromPoint(pxX, pxY) as HTMLElement | null;
    if (elem) {
      elem.click();
    }
  }

   



  // ---- Scroll up / down by hand movement ----
  const now = Date.now();
  if (now - lastScrollTimeRef.current > SCROLL_COOLDOWN) {
    const currentY = tip.y; // 0..1

    if (lastFingerYRef.current !== null) {
      const dyFinger = currentY - lastFingerYRef.current;
      const SCROLL_SENSITIVITY = 800; // adjust as you like

      if (Math.abs(dyFinger) > 0.01) {
        // dy > 0 → haath niche → scroll down
        // dy < 0 → haath upar → scroll up
        window.scrollBy({
          top: dyFinger * SCROLL_SENSITIVITY,
          left: 0,
          behavior: "smooth",
        });

        lastScrollTimeRef.current = now;
      }
    }

    lastFingerYRef.current = currentY;
  }

  // ---- Navigation gestures same as pehle ----
  if (detectPalmOpen(landmarks)) {
    handleGesture("RIGHT_PALM_OPEN");
    return;
  }
  const swipeDir = detectSwipe(landmarks);
  if (swipeDir === "LEFT") handleGesture("RIGHT_SWIPE_LEFT");
  if (swipeDir === "RIGHT") handleGesture("RIGHT_SWIPE_RIGHT");
  if (swipeDir === "UP") handleGesture("RIGHT_SWIPE_UP");
  if (swipeDir === "DOWN") handleGesture("RIGHT_SWIPE_DOWN");
}


  // ---------- 5) Left hand = bookmark gestures ----------
    if (handedness === "Left") {
    // 1) Screenshot gesture (all fingers close)
    if (detectScreenshotGesture(landmarks)) {
      handleGesture("RIGHT_SCREENSHOT");   // naam pehle wala hi rehne do, logic left hand ka hai
      return; // taaki same frame me bookmark bhi trigger na ho
    }

    // 2) Bookmark 1–5
    const bookmarkGesture = detectBookmarkGesture(landmarks);
    if (bookmarkGesture) {
      handleGesture(bookmarkGesture);
    }
  }
});

    });

    const camera = new Camera(webcamRef.current.video!, {
      onFrame: async () => {
        await hands.send({ image: webcamRef.current!.video! });
      },
      width: 640,
      height: 480,
    });

    camera.start();
    cameraRef.current = camera;

    return () => {
      camera.stop();
      hands.close();
      setCursorX(null);
      setCursorY(null);
    };
  }, [isCameraOn, showKeyboardScreen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 md:px-8 relative">



      
      {/* finger controlled cursor overlay */}



      {cursorX !== null && cursorY !== null && (
  <FingerCursor x={cursorX} y={cursorY} clicking={isClicking} />
)}

      <MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <button
        onClick={() => setIsBookmarkPanelOpen((prev) => !prev)}
        className="fixed top-24 right-4 z-50 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 flex flex-col gap-1 items-center justify-center hover:bg-slate-800 transition-colors" >
        <span className="w-6 h-0.5 bg-slate-200 rounded-full" />
        <span className="w-6 h-0.5 bg-slate-200 rounded-full" />
        <span className="w-6 h-0.5 bg-slate-200 rounded-full" />
      </button>
      <div
        className={`fixed top-24 right-4 z-40 bg-slate-900/95 border border-slate-700 rounded-2xl shadow-xl w-96 p-6 max-h-[80vh] overflow-y-auto transform transition-transform duration-200 ${
          isBookmarkPanelOpen ? "translate-x-0" : "translate-x-[110%]"
        }`}>
        <h3 className="text-2xl font-semibold mb-4 text-emerald-400 text-center">Bookmarks</h3>
        <ul className="space-y-3 mb-4">
          {bookmarks.map((bm, i) => (
            <li
              key={bm.label}
              className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3 text-sm hover:bg-slate-700 transition-colors">
              <div>
                <p className="font-semibold text-slate-100">
                  {i + 1}. {bm.label}
                </p>
                <p className="text-xs text-slate-400 truncate">{bm.url}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(bm.url, "_blank")}
                  className="text-xs px-3 py-1 rounded-full border border-emerald-400 text-emerald-300 hover:bg-emerald-500/10">
                  Open
                </button>
                <button
                  onClick={() => setBookmarks(bookmarks.filter((_, idx) => idx !== i))}
                  className="text-xs px-3 py-1 rounded-full border border-red-500 text-red-400 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 mt-2 border-t border-slate-700 pt-3">
          <input
            type="text"
            placeholder="Label"
            value={newBookmarkLabel}
            onChange={(e) => setNewBookmarkLabel(e.target.value)}
            className="p-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"/>
          <input
            type="url"
            placeholder="URL"
            value={newBookmarkUrl}
            onChange={(e) => setNewBookmarkUrl(e.target.value)}
            className="p-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"/>
          <button
            onClick={() => {
              if (!newBookmarkLabel || !newBookmarkUrl) return;
              if (bookmarks.length >= 5) {
                alert("You can only have up to 5 bookmarks!");
                return;
              }
              setBookmarks([...bookmarks, { label: newBookmarkLabel, url: newBookmarkUrl }]);
              setNewBookmarkLabel("");
              setNewBookmarkUrl("");
            }}
            className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors">
            Add Bookmark
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Gesture: Open <span className="text-emerald-300 font-semibold">1–5 fingers</span> with{" "}
          <span className="font-semibold">left hand</span> to open the bookmark.
        </p>

        <button
          onClick={() => {
            setShowKeyboardScreen(true);      // keyboard page on
            setIsBookmarkPanelOpen(false);    // panel band
            setIsCameraOn(false);             // main camera pause
          }}
          className="mt-4 w-full px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors" >
          Open Gesture Keyboard
        </button>
      </div>

      {showKeyboardScreen ? (
        <main className="mt-10">
          <GestureKeyboardPanel
            onClose={() => {
              setShowKeyboardScreen(false);
              setIsCameraOn(true);   
            }}/>
        </main>
      ) : (
        <>
          <main className="mt-10">
            {currentPage === "home" && <HomePage />}
            {currentPage === "aboutProject" && (
  <section className="py-24 px-8 bg-gradient-to-r from-slate-900/90 to-slate-800/90 rounded-3xl shadow-2xl max-w-6xl mx-auto transform transition-transform duration-500 hover:scale-105">
    <h2 className="text-6xl md:text-7xl font-extrabold text-emerald-400 mb-12 text-left">About This Project</h2>
    
    <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed text-left max-w-4xl">
      This <span className="font-semibold text-emerald-300">Gesture-Based Navigation System</span> lets users browse websites 
      using only <span className="font-semibold">hand gestures</span>. It's powered by 
      <span className="font-semibold text-emerald-300"> AI, TensorFlow.js, and MediaPipe Hands</span>, giving real-time 
      detection, accuracy, and a touch-free experience.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Feature 1 */}
      <div className="flex gap-4 items-start transform transition-transform duration-500 hover:translate-x-2">
        <div className="text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-2">Touch-Free Navigation</h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            Browse pages without clicking, using simple hand gestures — completely hands-free!
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex gap-4 items-start transform transition-transform duration-500 hover:translate-x-2">
        <div className="text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6h5V11h3L12 3 2 11h3v6h4z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-2">AI-Powered Detection</h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            MediaPipe & TensorFlow.js accurately detect and classify hand gestures in real-time.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex gap-4 items-start transform transition-transform duration-500 hover:translate-x-2">
        <div className="text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-2">Real-Time Feedback</h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            See detected gestures instantly with live webcam preview and logs for precise navigation.
          </p>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="flex gap-4 items-start transform transition-transform duration-500 hover:translate-x-2">
        <div className="text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 16h.01M12 8h.01" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-2">Customizable Actions</h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            Easily add new gestures or link them to new actions. Flexible for future expansion.
          </p>
        </div>
      </div>
    </div>

    
  </section>
)}

            {currentPage === "aboutMe" && (
  <section className="py-24 px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-5xl mx-auto text-center animate-fadeIn">

    {/* Title */}
    <h2 className="text-6xl md:text-7xl font-extrabold text-emerald-400 mb-12 animate-fadeInDown">
      About Me
    </h2>

    {/* Profile Image */}
    <div className="mb-10 animate-fadeIn">
      <img
        src="/kashish.jpeg"
        alt="Kashish Kalouni"
        className="w-56 h-56 md:w-64 md:h-64 mx-auto rounded-full object-cover border-4 border-emerald-400 shadow-xl"
      />
    </div>

    {/* Intro Text */}
    <p className="text-2xl md:text-3xl text-slate-300 mb-8 leading-relaxed max-w-4xl mx-auto">
      Hi, I'm <span className="font-semibold text-emerald-300">Kashish Kalouni</span>, a passionate web developer and AI enthusiast from Delhi, India.  
      Currently pursuing <span className="font-semibold">BCA at Vivekananda Institute Of Professional Studies (2023–2026)</span> with a CGPA of 9.70.  
      Skilled in <span className="font-semibold">HTML, CSS, JavaScript, React.js, Python</span>, and AI/ML technologies.
    </p>

    <p className="text-2xl md:text-3xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
      I have built projects like <span className="font-semibold">AI vs Real Image Detector</span> and <span className="font-semibold">Mumma Talks AI Chatbot</span>, demonstrating my expertise in AI applications and interactive web systems.  
      I enjoy creating user-friendly and intuitive digital experiences.
    </p>

    {/* Skills & Interests */}
    <h3 className="text-4xl md:text-5xl font-semibold text-emerald-300 mt-12 mb-6 animate-fadeInUp">
      Skills & Interests
    </h3>
    <ul className="list-disc list-inside text-xl md:text-2xl text-slate-300 space-y-4 max-w-3xl mx-auto text-left">
      <li>Web Development: HTML5, CSS3, JavaScript, React.js, Tailwind CSS</li>
      <li>Programming: Python, Java, C++, SQL</li>
      <li>AI/ML: Deep Learning, Image Classification, NLP, TensorFlow.js</li>
      <li>UI/UX Design: Gesture-based interfaces, Responsive design, Interactive components</li>
      <li>Version Control & Collaboration: Git, GitHub</li>
    </ul>

    {/* Social Links */}
    <div className="flex justify-center gap-8 mt-12 text-xl md:text-2xl animate-fadeInUp">
      <a href="https://github.com/Kashish-kalouni" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 transition-colors">GitHub</a>
      <a href="https://www.linkedin.com/in/kashish-kalouni-983000322" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 transition-colors">LinkedIn</a>
      <a href="https://x.com/KalouniKashish" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 transition-colors">Twitter</a>
    </div>

  </section>
)}


            {currentPage === "contact" && (
              <section className="py-20 px-6 bg-slate-900/80 rounded-2xl shadow-lg mb-12 text-center max-w-3xl mx-auto">
                <h2 className="text-5xl font-bold text-emerald-400 mb-8">Contact & Feedback</h2>
                <p className="text-2xl text-slate-300 mb-6">
                  Reach out via email or social links, or send your feedback using the form below.
                </p>
                <p className="text-2xl text-slate-300 mb-6">
                  Email: <span className="font-semibold text-emerald-300">kalounikashish@gmail.com</span>
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                      alert("Please enter a valid email address!");
                      return;
                    }
                    if (!name || !message) {
                      alert("Please fill in all fields!");
                      return;
                    }
                    alert(`Thank you for your feedback, ${name}!\nWe will reach out to you at ${email}.`);
                    form.reset();
                  }}
                  className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="p-3 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
                    required/>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="p-3 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
                    required />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className="p-3 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:border-emerald-400"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-500 rounded-full font-semibold text-lg hover:bg-emerald-400 transition-colors">
                    Send Feedback
                  </button>
                </form>

                <div className="flex justify-center gap-6 mt-6 text-xl">
                  <a
                    href="https://github.com/Kashish-kalouni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-emerald-400 transition-colors">
                    GitHub
                  </a>
                  <a
                    href="https://in.linkedin.com/in/kashish-kalouni-983000322?original_referer=https%3A%2F%2Fwww.google.com%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-emerald-400 transition-colors">
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/KalouniKashish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-emerald-400 transition-colors">
                    Twitter
                  </a>
                </div>
              </section>
            )}

            {currentPage === "login" && (
              <section className="py-16 px-6 bg-slate-900/80 rounded-2xl shadow-lg mb-12 max-w-md mx-auto relative">
                <img src="/leaf.png" alt="leaf" className="absolute top-0 right-0 w-80 z-0" />
                <img src="/leaf.png" alt="leaf" className="absolute -top-8 -right-10 w-20 z-0" />
                <LoginSignInForm />
              </section>
            )}
{currentPage === "learn" && (
  <section className="py-24 px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-6xl mx-auto text-center animate-fadeIn">

    {/* Title */}
    <h2 className="text-6xl md:text-7xl font-extrabold text-blue-400 mb-16 animate-fadeInDown">
      What I’m Learning
    </h2>

    {/* Subtext */}
    <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-20 animate-fadeIn">
      I believe in continuous learning.  
      Here are the technologies, concepts, and fields I am actively mastering to grow as a modern developer & AI engineer.
    </p>

    {/* Learning Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">

      {/* Card 1 */}
      <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-xl hover:-translate-y-2 transition-all animate-fadeInUp">
        <div className="text-5xl mb-4">🧠</div>
        <h3 className="text-3xl font-bold text-blue-300 mb-4">AI & Machine Learning</h3>
        <p className="text-xl text-slate-300 leading-relaxed">
          Deep Learning, CNNs, Image Classification, NLP,  
          Model Training & Deployment, TensorFlow.js.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-xl hover:-translate-y-2 transition-all animate-fadeInUp">
        <div className="text-5xl mb-4">💻</div>
        <h3 className="text-3xl font-bold text-blue-300 mb-4">Full-Stack Web Development</h3>
        <p className="text-xl text-slate-300 leading-relaxed">
          React.js, JavaScript, Tailwind CSS, REST APIs,  
          responsive UI components, structured state management.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-xl hover:-translate-y-2 transition-all animate-fadeInUp">
        <div className="text-5xl mb-4">⚙️</div>
        <h3 className="text-3xl font-bold text-blue-300 mb-4">Programming Mastery</h3>
        <p className="text-xl text-slate-300 leading-relaxed">
          Building strong fundamentals in Python, Java,  
          C++, DSA, object-oriented design, logical problem solving.
        </p>
      </div>

      {/* Card 4 */}
      <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-xl hover:-translate-y-2 transition-all animate-fadeInUp">
        <div className="text-5xl mb-4">🧩</div>
        <h3 className="text-3xl font-bold text-blue-300 mb-4">UI/UX & Interaction</h3>
        <p className="text-xl text-slate-300 leading-relaxed">
          Gesture-based interfaces, usability design,  
          intuitive layouts, animation systems & micro-interactions.
        </p>
      </div>

      {/* Card 5 */}
      <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-xl hover:-translate-y-2 transition-all animate-fadeInUp">
        <div className="text-5xl mb-4">☁️</div>
        <h3 className="text-3xl font-bold text-blue-300 mb-4">Cloud & Deployment</h3>
        <p className="text-xl text-slate-300 leading-relaxed">
          Hosting AI models, securing endpoints,  
          managing GitHub deployments, optimizing web performance.
        </p>
      </div>

      {/* Card 6 */}
      <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-xl hover:-translate-y-2 transition-all animate-fadeInUp">
        <div className="text-5xl mb-4">📚</div>
        <h3 className="text-3xl font-bold text-blue-300 mb-4">Research & Innovation</h3>
        <p className="text-xl text-slate-300 leading-relaxed">
          Reading papers, experimenting with AGI concepts,  
          and exploring futuristic AI systems.
        </p>
      </div>
    </div>

  </section>
)}


{/* {currentPage === "howToUse" && <HowToFullPage onBack={() => setCurrentPage("home")} />} */}



            {/* Gesture Preview + Logs */}
            <section className="grid md:grid-cols-2 gap-6">
              <div
                className={`bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg ${
                  currentPage !== "home" ? "w-50 h-50 fixed bottom-10 right-10 z-30" : ""
                }`}>
                <div className="flex justify-between items-center mb-4">
                  {currentPage === "home" && <h3 className="text-2xl font-semibold">Gesture Preview</h3>}
                  <button
                    onClick={() => setIsCameraOn((prev) => !prev)}
                    className={`px-3 py-1 rounded-full text-lg border ${
                      isCameraOn
                        ? "border-rose-500 text-rose-300 hover:bg-rose-500/10"
                        : "border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
                    } transition-colors duration-200`}>
                    {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
                  </button>
                </div>
                <div
                  className={`border border-slate-700 rounded-xl overflow-hidden bg-black flex items-center justify-center ${
                    currentPage === "home" ? "mb-4 h-72 w-full" : "h-56 w-56"
                  }`}>
                  {isCameraOn ? (
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      className="object-cover w-full h-full"
                      videoConstraints={{ facingMode: "user" }}/>
                  ) : (
                    <p className="text-lg text-slate-400 text-center px-4 py-10">
                      Camera is <span className="text-rose-400 font-medium">turned off</span>. Click{" "}
                      <span className="text-emerald-300 font-medium">"Turn On Camera"</span> to resume.
                    </p>
                  )}
                </div>

                {currentPage === "home" && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={() => handleGesture("RIGHT_PALM_OPEN")}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 text-lg font-semibold shadow-lg hover:shadow-emerald-400/40 transition-all duration-200">
                        Right PALM_OPEN → Home
                      </button>
                      <button
                        onClick={() => handleGesture("RIGHT_SWIPE_LEFT")}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-400 text-lg font-semibold shadow-lg hover:shadow-sky-400/40 transition-all duration-200">
                        Right SWIPE_LEFT → About Project
                      </button>
                      <button
                        onClick={() => handleGesture("RIGHT_SWIPE_RIGHT")}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 text-lg font-semibold shadow-lg hover:shadow-fuchsia-400/40 transition-all duration-200">
                        Right SWIPE_RIGHT → Contact
                      </button>
                      <button
                        onClick={() => handleGesture("RIGHT_SWIPE_UP")}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-400 text-lg font-semibold shadow-lg hover:shadow-yellow-400/40 transition-all duration-200">
                        Right SWIPE_UP → About Me
                      </button>
                      <button
                        onClick={() => handleGesture("RIGHT_SWIPE_DOWN")}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-red-400 text-lg font-semibold shadow-lg hover:shadow-pink-400/40 transition-all duration-200">
                        Right SWIPE_DOWN → Login
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => handleGesture(`BM_${n}`)}
                          className="flex-1 min-w-[80px] px-3 py-2 rounded-full bg-slate-800 text-sm font-semibold hover:bg-slate-700 border border-slate-600">
                          Left BM_{n} → {bookmarks[n - 1]?.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {currentPage === "home" && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">Gesture Logs</h3>
                  <p className="text-sm text-slate-400 mb-2">Last Gesture: {lastGesture}</p>
                  {logs.length === 0 ? (
                    <p className="text-lg text-slate-400">No gestures detected yet.</p>
                  ) : (
                    <ul className="text-lg max-h-80 overflow-y-auto space-y-1">
                      {logs.map((log, index) => (
                        <li
                          key={index}
                          className="border-b border-slate-800 pb-1 flex items-center justify-between text-sm" >
                          <span className="text-slate-500 mr-2">[{log.time}]</span>
                          <span className="text-slate-200 font-medium bg-slate-800/60 px-2 py-0.5 rounded-full">
                            {log.gesture}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </section>
            {currentPage === "howToUse" && <HowToFullPage onBack={() => setCurrentPage("home")} />}

          </main>
          <footer className="mt-12 border-t border-slate-800 pt-6 text-lg text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p>© {new Date().getFullYear()} Gesture-Driven Interactive Web System · Minor Project (BCA)</p>
            <p className="text-slate-500">
              Built by <span className="text-emerald-300 font-medium">Kashish Kalouni</span> · Technologies: React.js,
              TypeScript, Tailwind CSS, react-webcam, TensorFlow.js (MediaPipe Hands)
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App; 

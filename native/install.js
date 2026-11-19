// Runs automatically after "npx cap sync" (see package.json "capacitor:sync:after").
// Copies the native speech code into the generated Android project.
const fs = require("fs"), path = require("path");
const root = process.cwd();
const dir = path.join(root, "android/app/src/main/java/com/kanadojo/app");
fs.mkdirSync(dir, { recursive: true });
["MainActivity.java", "TTSBridge.java"].forEach(f =>
  fs.copyFileSync(path.join(__dirname, f), path.join(dir, f)));
const mf = path.join(root, "android/app/src/main/AndroidManifest.xml");
let m = fs.readFileSync(mf, "utf8");
if (!m.includes("TTS_SERVICE")) {
  m = m.replace("</manifest>",
    '    <queries><intent><action android:name="android.intent.action.TTS_SERVICE"/></intent></queries>\n</manifest>');
  fs.writeFileSync(mf, m);
}
console.log("Kana Dojo: native speech installed into " + dir);

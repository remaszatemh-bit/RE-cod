# تشغيل محرر الأكواد محليًا (بدون CDN)

الملف الرئيسي الآن يشير إلى مكتبة CodeMirror من مجلد محلي `assets/codemirror/` بدل
`cdnjs.cloudflare.com`. لتفعيل ذلك، أنشئي على السيرفر (بجانب ملف HTML) مسار:

```
assets/codemirror/
```

وحمّلي فيه هذه الملفات (14 ملفًا) بنفس الأسماء بالضبط — انسخي كل رابط في المتصفح
واحفظي الصفحة (Ctrl+S) داخل المجلد:

**الأساس:**
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css → `codemirror.min.css`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js → `codemirror.min.js`

**أوضاع اللغات (Modes):**
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js → `xml.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/css/css.min.js → `css.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js → `javascript.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js → `htmlmixed.min.js`

**إضافات (Addons):**
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js → `matchbrackets.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js → `closebrackets.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closetag.min.js → `closetag.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.css → `show-hint.min.css`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.js → `show-hint.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/html-hint.min.js → `html-hint.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/css-hint.min.js → `css-hint.min.js`
- https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/javascript-hint.min.js → `javascript-hint.min.js`

بعد رفع هذه الملفات، سيعمل محرر الأكواد بالكامل من السيرفر الخاص بك دون أي اتصال
خارجي بـ CDN.

## لماذا لم أضع محتوى الملفات مباشرة؟
حاولت تحميل محتوى هذه الملفات وتضمينه مباشرة في الكود، لكن أدوات الجلب المتاحة لي
تقصّ الملفات الكبيرة (مثل `codemirror.min.js`) في منتصفها، وتضمين نسخة مقصوصة
سيكسر المحرر بصمت. الطريقة أعلاه (تحميل الملفات كاملة من الرابط الرسمي) هي الطريقة
المضمونة لضمان عمل الموقع بشكل صحيح.

## بديل أسرع
إذا لم يكن لديك وقت لتحميل الملفات يدويًا الآن، أبقِ الوضع الحالي (روابط CDN) — الموقع
سيعمل بشكل طبيعي طالما عند الزوار اتصال إنترنت عادي، لأن ملفات CDN تُحمَّل من متصفح
الزائر مباشرة وليس من سيرفرك.

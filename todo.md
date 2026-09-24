# TODO: التعديلات المطلوبة

## ✅ المهمة 1: حذف زر المتابعة (Follow button)
- [ ] إزالة `<div class="stat-item follow-stat">...</div>` من hero section
- [ ] إزالة المتغيرات `followerCount`, `hasFollowed`
- [ ] إزالة الدوال `updateFollowStats()`, `followSite()`
- [ ] إزالة نصوص الترجمة: `followBtn`, `followBtnDone`, `followLabel`, `followSuccess`, `followAlready`
- [ ] إزالة استدعاءات `updateFollowStats()`

## ✅ المهمة 2: حذف عدادات النسخ والاستيراد
- [ ] إزالة `<span class="copy-counter">` من بطاقة القالب
- [ ] إزالة `<div class="stat-item">` الخاص بعداد Imports
- [ ] إزالة المتغير `importCount`
- [ ] إزالة الدوال: `getTemplateCopyCounts()`, `saveTemplateCopyCounts()`, `incrementTemplateCopyCount()`, `getTemplateCopyCount()`, `updateCardCopyCountUI()`

## ✅ المهمة 3: منع النسخ قبل تسجيل الدخول
- [ ] تعديل `copyCodeText()` لإظهار رسالة "يجب تسجيل الدخول أولاً"
- [ ] تعديل `copyTemplateById()` للتحقق من تسجيل الدخول


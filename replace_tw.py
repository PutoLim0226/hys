import os
import re

replacements = {
    '首頁': '首页',
    '關於我們': '关于我们',
    '活動資訊': '活动资讯',
    '慈善項目': '慈善项目',
    '佛法弘揚': '佛法弘扬',
    '義工園地': '义工园地',
    '捐款支持': '捐款支持',
    '新聞中心': '新闻中心',
    '聯絡我們': '联系我们',
    '後台管理': '后台管理',
    '檢視感謝狀': '查看感谢状',
    '最新活動資訊與回顧': '最新活动资讯与回顾',
    '近期活動': '近期活动',
    '查看我們即將舉辦的各項活動，歡迎踴躍報名參加。': '查看我们即将举办的各项活动，欢迎踊跃报名参加。',
    '活動回顧': '活动回顾',
    '回顧我們過去舉辦的精彩活動與珍貴時刻。': '回顾我们过去举办的精彩活动与珍贵时刻。',
    '查看回顧': '查看回顾',
    '用愛心點亮希望，用行動溫暖人間': '用爱心点亮希望，用行动温暖人间',
    '教育計劃': '教育计划',
    '提供清寒學子助學金，培育未來人才。': '提供清寒学子助学金，培育未来人才。',
    '扶貧助困': '扶贫助困',
    '救濟弱勢家庭，提供物資與急難救助。': '救济弱势家庭，提供物资与急难救助。',
    '醫療援助': '医疗援助',
    '定期舉辦捐血活動，補助清寒病患。': '定期举办捐血活动，补助清寒病患。',
    '淨化人心，祥和社會': '净化人心，祥和社会',
    '佛法講座': '佛法讲座',
    '邀請高僧大德弘法，開示人生智慧。': '邀请高僧大德弘法，开示人生智慧。',
    '禪修活動': '禅修活动',
    '定期舉辦禪修營，找回內心的平靜與自在。': '定期举办禅修营，找回内心的平静与自在。',
    '重新填寫': '重新填写',
    '電子憑證': '电子凭证',
    '關於我們管理': '关于我们管理',
    '關於我們內容管理': '关于我们内容管理',
    '新增關於我們區塊': '新增关于我们区块'
}

files_to_check = [
    'src/pages/admin/AdminAbout.jsx',
    'src/pages/Events.jsx',
    'src/pages/DonationVerification.jsx',
    'src/i18n/translations.js',
    'src/pages/Volunteers.jsx',
    'src/pages/Dharma.jsx',
    'src/pages/Charity.jsx'
]

for file_path in files_to_check:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for tw, cn in replacements.items():
        content = content.replace(tw, cn)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete.")

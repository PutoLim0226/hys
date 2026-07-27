import re

with open('src/pages/HomeOld.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace SeoHead with Helmet
content = content.replace("import { SeoHead } from '../components/SeoHead';", "import { Helmet } from 'react-helmet-async';")
content = re.sub(r'<SeoHead title=\{([^\}]+)\} />', r'<Helmet>\n        <title>{t(\'nav.home\')} | HUI YIN SEH</title>\n      </Helmet>', content)
content = content.replace("t('home.aboutSectionTitle')", "t('home.aboutSectionTitle')") # just in case

# Fix translation to Simplified Chinese using the same dictionary from earlier
replacements = {
    '首頁': '首页', '關於我們': '关于我们', '活動資訊': '活动资讯', '慈善項目': '慈善项目',
    '佛法弘揚': '佛法弘扬', '義工園地': '义工园地', '捐款支持': '捐款支持', '新聞中心': '新闻中心',
    '聯絡我們': '联系我们', '後台管理': '后台管理', '檢視感謝狀': '查看感谢状',
    '最新活動資訊與回顧': '最新活动资讯与回顾', '近期活動': '近期活动',
    '查看我們即將舉辦的各項活動，歡迎踴躍報名參加。': '查看我们即将举办的各项活动，欢迎踊跃报名参加。',
    '活動回顧': '活动回顾', '回顧我們過去舉辦的精彩活動與珍貴時刻。': '回顾我们过去举办的精彩活动与珍贵时刻。',
    '查看回顧': '查看回顾', '用愛心點亮希望，用行動溫暖人間': '用爱心点亮希望，用行动温暖人间',
    '教育計劃': '教育计划', '提供清寒學子助學金，培育未來人才。': '提供清寒学子助学金，培育未来人才。',
    '扶貧助困': '扶贫助困', '救濟弱勢家庭，提供物資與急難救助。': '救济弱势家庭，提供物资与急难救助。',
    '醫療援助': '医疗援助', '定期舉辦捐血活動，補助清寒病患。': '定期举办捐血活动，补助清寒病患。',
    '淨化人心，祥和社會': '净化人心，祥和社会', '佛法講座': '佛法讲座',
    '邀請高僧大德弘法，開示人生智慧。': '邀请高僧大德弘法，开示人生智慧。',
    '禪修活動': '禅修活动', '定期舉辦禪修營，找回內心的平靜與自在。': '定期举办禅修营，找回内心的平静与自在。',
    '重新填寫': '重新填写', '電子憑證': '电子凭证', '關於慧音社': '关于慧音社',
    '創立於1973年，立足檳城，服務社會': '创立于1973年，立足槟城，服务社会',
    '弘揚佛法與教化': '弘扬佛法与教化',
    '推動佛學講座、發行社刊、辦理慈幼班，引導青少年立身正道。': '推动佛学讲座、发行社刊、办理慈幼班，引导青少年立身正道。',
    '定期愛心獻血': '定期爱心献血',
    '常年組織大型愛心捐血運動，協助檳城中央醫院庫存充裕，累計救人無數。': '常年组织大型爱心捐血运动，协助槟城中央医院库存充裕，累计救人数无。',
    '音樂藝術與合唱團': '音乐艺术与合唱团',
    '慧音社合唱團致力於推廣高品質合唱藝術，透過美妙歌聲傳遞平和與愛。': '慧音社合唱团致力于推广高品质合唱艺术，透过美妙歌声传递平和与爱。',
    '最新消息與精彩活動': '最新消息与精彩活动',
    '掌握慧音社最新動態與社區慈善專案': '掌握慧音社最新动态与社区慈善专案',
    '查看所有消息': '查看所有消息',
    '愛心影響力數據': '爱心影响力数据',
    '次成功獻血紀錄': '次成功献血纪录',
    '活躍志工與社員': '活跃志工与社员',
    '年社會慈善服務': '年社会慈善服务',
    '您的每一份善款，都是改變社會的力量': '您的每一份善款，都是改变社会的力量',
    '支持慧音社捐血活動、合唱團培訓與貧困急難救助。': '支持慧音社捐血活动、合唱团培训与贫困急难救助。',
    '立即支持捐款': '立即支持捐款',
    '瞭解更多': '了解更多',
    '加入志工行列': '加入志工行列',
    'Volunteer': 'Volunteers',  # update link
    '/volunteer': '/volunteers',
    '/news-events': '/news'
}

for k, v in replacements.items():
    content = content.replace(k, v)
    
# also fix api endpoint if needed, but in 254fe3a it was already fetch('/api/news.php?status=published')
content = content.replace("fetch('/api/news.php?status=published')", "apiFetch('/news.php?status=published')")
content = content.replace("import { useLanguage }", "import { apiFetch } from '../api/client';\nimport { useLanguage }")

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)


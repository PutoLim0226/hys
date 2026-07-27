import os
import re

def rewrite_page(path, title_key, subtitle_key, sections):
    # Generates a standard page with the beautiful template
    imports = """import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
"""
    
    component_name = os.path.basename(path).replace('.jsx', '')
    
    code = f"""{imports}
export const {component_name} = () => {{
  const {{ t }} = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{{t('{title_key}')}} | HUI YIN SEH</title>
      </Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{{t('{title_key}')}}</h1>
          <p className="section-subtitle">{{t('{subtitle_key}')}}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
"""
    for section in sections:
        code += f"""
          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{{t('{section["title"]}')}}</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {section["content"]}
            </div>
          </div>
"""

    code += """
        </div>
      </section>
    </div>
  );
};
"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(code)


# About
rewrite_page(
    'src/pages/About.jsx', 
    'nav.about', 
    'about.pageTitle',
    [
        {"title": "about.historyTitle", "content": "{t('about.historyText')}"},
        {"title": "about.missionTitle", "content": """<ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m1')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m2')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m3')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m4')}</li>
              </ul>"""},
        {"title": "about.orgTitle", "content": "{t('about.orgDesc')}"}
    ]
)

# Events
rewrite_page(
    'src/pages/Events.jsx',
    'nav.events',
    'nav.events',
    [
        {"title": "nav.events", "content": "{t('nav.events')}内容建设中..."}
    ]
)

# Charity
rewrite_page(
    'src/pages/Charity.jsx',
    'nav.charity',
    'nav.charity',
    [
        {"title": "nav.charity", "content": "{t('nav.charity')}内容建设中..."}
    ]
)

# Dharma
rewrite_page(
    'src/pages/Dharma.jsx',
    'nav.dharma',
    'nav.dharma',
    [
        {"title": "nav.dharma", "content": "{t('nav.dharma')}内容建设中..."}
    ]
)

# Volunteers
rewrite_page(
    'src/pages/Volunteers.jsx',
    'nav.volunteer',
    'volunteer.joinTitle',
    [
        {"title": "volunteer.reqTitle", "content": """<ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('volunteer.req1')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('volunteer.req2')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('volunteer.req3')}</li>
              </ul>"""},
        {"title": "volunteer.formTitle", "content": """<p>{t('volunteer.formDesc')}</p>
              <button className="btn btn-primary mt-3">{t('volunteer.submitBtn')}</button>"""}
    ]
)

# Donation
rewrite_page(
    'src/pages/Donation.jsx',
    'nav.donate',
    'donation.methodsTitle',
    [
        {"title": "donation.bankTransfer", "content": """<p><strong>{t('donation.bankName')}</strong><br/>
                 {t('donation.accName')}<br/>
                 {t('donation.accNo')}</p>"""},
        {"title": "donation.onlineTitle", "content": """<p>{t('donation.onlineDesc')}</p>
              <button className="btn btn-primary">{t('hero.donateBtn')}</button>"""}
    ]
)

# Contact
rewrite_page(
    'src/pages/Contact.jsx',
    'nav.contact',
    'nav.contact',
    [
        {"title": "nav.contact", "content": """<p>📍 30, Lintang Paya Terubong 3, Bandar Baru Air Itam, 11060 Ayer Itam, Pulau Pinang, Malaysia.</p>
              <p>📞 +60 4-829 5198</p>
              <p>✉️ contact@huiyinseh.org</p>
              <p>🕒 周一至周日 09:00 - 17:00</p>"""}
    ]
)

print("All pages rewritten to match original beautiful styles!")

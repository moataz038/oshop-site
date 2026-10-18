import re, json, math, shutil
ROOT='/home/user/workspace/oshop-site/.vercel/output'
ST=ROOT+'/static'
def rep(s, old, new, count=None, label=''):
    n=s.count(old)
    if n==0: raise SystemExit(f'NOT FOUND [{label}]: {old[:80]}')
    if count is not None and n!=count: raise SystemExit(f'COUNT {n}!={count} [{label}]: {old[:80]}')
    return s.replace(old,new)

# ---------- main front-end bundle ----------
f=ST+'/assets/index-6ttDirym.js'; s=open(f,encoding='utf-8').read()
s=rep(s,',{id:"afaaq",hex:"#4589c4",name:"أفاق"}','',1)
s=rep(s,'Rp=[{id:"violet"','Rp=[{id:"oshop",hex:"#f37022",name:"اوشوب"},{id:"violet"',1)
s=rep(s,'theme:"violet",size:"default"','theme:"oshop",size:"default"',1)
s=rep(s,'Ap="afaaq_prefs"','Ap="oshop_prefs"',1)
s=rep(s,'img/afaaq-mark.png','img/oshop-mark.png')
s=rep(s,'"#0f0e15":"#d6e8fb"','"#120e0c":"#fde3d0"',1)
old_contacts='c.jsx(He,{icon:c.jsx(Sk,{}),title:"الفروع",sub:"مصراتة · طرابلس · بنغازي",onClick:()=>window.open("https://linktr.ee/afaq2023","_blank")}),c.jsx(He,{icon:c.jsx(vk,{}),title:"إنستغرام",sub:"@afaq.ly.2023",onClick:()=>window.open("https://www.instagram.com/afaq.ly.2023","_blank")}),c.jsx(He,{icon:c.jsx(Iy,{}),title:"تواصل معنا",sub:"عبر Linktree",onClick:()=>window.open("https://linktr.ee/afaq2023","_blank")})'
new_contacts=('c.jsx(He,{icon:c.jsx(Sk,{}),title:"فرع مصراتة",sub:"الدائري الثاني · تقاطع المقاوبة",onClick:()=>window.open("https://maps.app.goo.gl/XkrM5y7T1ahBsXFD7","_blank")}),'
 'c.jsx(He,{icon:c.jsx(Sk,{}),title:"فرع طرابلس",sub:"الجرابة · قرب مطعم تقاسيم",onClick:()=>window.open("https://maps.app.goo.gl/s8fjUVYXkY1EDM6BA","_blank")}),'
 'c.jsx(He,{icon:c.jsx(vk,{}),title:"إنستغرام",sub:"@oshop.company",onClick:()=>window.open("https://www.instagram.com/oshop.company","_blank")}),'
 'c.jsx(He,{icon:c.jsx(Iy,{}),title:"واتساب مصراتة",sub:"0927172021",onClick:()=>window.open("https://wa.me/218927172021","_blank")}),'
 'c.jsx(He,{icon:c.jsx(Iy,{}),title:"واتساب طرابلس",sub:"0947172021",onClick:()=>window.open("https://wa.me/218947172021","_blank")})')
s=rep(s,old_contacts,new_contacts,1,'contacts')
s=rep(s,'AFQ-2025','OSH-2025')
s=s.replace('آفاق','اوشوب').replace('أفاق','اوشوب')
assert 'afaq' not in s.lower() and 'فاق' not in s and 'بنغازي' not in s, 'leftover'
s=rep(s,'violet:"#8b5cf6",blue:"#4e8df7"','violet:"#8b5cf6",blue:"#4e8df7"',1)  # chip palette kept
open(f,'w',encoding='utf-8').write(s)

# ---------- CSS ----------
f=ST+'/assets/index-ca6a3825.css'; c=open(f,encoding='utf-8').read()
pairs=[
 (':root{--accent: #8b5cf6;--accent-2: #4e8df7;--accent-soft: rgba(139, 92, 246, .14);--lavender: #e3eefc;--bg: #f3f7fd;--bg-top: #d6e8fb;--bg-mid: #e5effd;--bg-low: #f6f9fe;--bg-bottom: #d3e3f9;--surface: #ffffff;--surface-2: #f4f1fb;--surface-3: #ebe8f6;--ink: #1c1a2e;--ink-2: #6b6880;--ink-3: #a09db5;--line: rgba(28, 26, 46, .06);--line-2: rgba(28, 26, 46, .1);--bubble-ai: #ffffff;--shadow-sm: 0 1px 2px rgba(28, 26, 46, .04), 0 6px 18px -8px rgba(28, 26, 46, .1);--shadow-md: 0 4px 10px -4px rgba(28, 26, 46, .08), 0 18px 40px -16px rgba(28, 26, 46, .18);',
  ':root{--accent: #f37022;--accent-2: #f7941d;--accent-soft: rgba(243, 112, 34, .14);--lavender: #fdeadb;--bg: #fdf7f3;--bg-top: #fde3d0;--bg-mid: #fdeee4;--bg-low: #fef9f6;--bg-bottom: #fbdcc7;--surface: #ffffff;--surface-2: #fbf4ef;--surface-3: #f5ebe3;--ink: #221c18;--ink-2: #75695f;--ink-3: #ad9f94;--line: rgba(34, 28, 24, .06);--line-2: rgba(34, 28, 24, .1);--bubble-ai: #ffffff;--shadow-sm: 0 1px 2px rgba(34, 28, 24, .04), 0 6px 18px -8px rgba(34, 28, 24, .1);--shadow-md: 0 4px 10px -4px rgba(34, 28, 24, .08), 0 18px 40px -16px rgba(34, 28, 24, .18);'),
 ('--background: 250 60% 98%;--foreground: 246 27% 14%;--border: 246 20% 92%;--card: 0 0% 100%;--card-foreground: 246 27% 14%;--popover: 0 0% 100%;--popover-foreground: 246 27% 14%;--primary: 262 90% 66%;',
  '--background: 24 70% 97%;--foreground: 24 18% 12%;--border: 24 30% 91%;--card: 0 0% 100%;--card-foreground: 24 18% 12%;--popover: 0 0% 100%;--popover-foreground: 24 18% 12%;--primary: 22 90% 54%;'),
 ('--muted: 250 40% 95%;--muted-foreground: 246 10% 46%;','--muted: 24 50% 95%;--muted-foreground: 24 10% 42%;'),
 ('--ring: 262 90% 66%;--input: 246 20% 90%;','--ring: 22 90% 54%;--input: 24 25% 90%;'),
 ('.dark{--bg: #0f0e15;--bg-top: #141a28;--bg-mid: #121019;--bg-low: #0f0e15;--bg-bottom: #0f0e15;--surface: #17161f;--surface-2: #1e1c29;--surface-3: #262436;--ink: #f4f2fb;--ink-2: #a6a3b8;--ink-3: #6f6c82;',
  '.dark{--bg: #120e0c;--bg-top: #2a1a10;--bg-mid: #17110d;--bg-low: #120e0c;--bg-bottom: #120e0c;--surface: #1c1612;--surface-2: #241c17;--surface-3: #30251e;--ink: #fbf5f1;--ink-2: #b8aaa0;--ink-3: #84766c;'),
 ('--bubble-ai: #1e1c29;','--bubble-ai: #241c17;'),
 ('--background: 246 20% 7%;--foreground: 250 40% 96%;--border: 246 10% 18%;--card: 246 15% 11%;--card-foreground: 250 40% 96%;--popover: 246 15% 11%;--popover-foreground: 250 40% 96%;--muted: 246 15% 14%;--muted-foreground: 246 10% 68%',
  '--background: 24 20% 6%;--foreground: 24 40% 96%;--border: 24 10% 18%;--card: 24 15% 10%;--card-foreground: 24 40% 96%;--popover: 24 15% 10%;--popover-foreground: 24 40% 96%;--muted: 24 15% 13%;--muted-foreground: 24 10% 68%'),
 ('[data-theme=afaaq]{--accent: #4589c4;--accent-2: #253d7d}','[data-theme=oshop]{--accent: #f37022;--accent-2: #f7941d}'),
 ('#f0abfc','#e8590c'),
]
for a,b in pairs: c=rep(c,a,b,label='css')
open(f,'w',encoding='utf-8').write(c)

# ---------- Orb ----------
f=ST+'/assets/Orb-Bm_qLAkp.js'; o=open(f).read()
o=o.replace('"#8b5cf6"','"#f37022"').replace('"#4e8df7"','"#f7941d"').replace('"#f0abfc"','"#ffb070"')
open(f,'w').write(o)

# ---------- 3D ChromeLogo ----------
f=ST+'/assets/ChromeLogo-BU19-cbJ.js'; g=open(f).read()
k=0.0124; cx,cy=51,50
def P(x,y,r): return [round((x-cx)*k,4), round(-(y-cy)*k,4), round(r*k,4)]
def cap(dist,R): return R if dist>=R else R*math.sqrt(max(0,1-(1-dist/R)**2))
# ring
Rm=28.5; R=9.6; a0,a1=165,465; N=170
L=math.radians(a1-a0)*Rm
ring=[]
for i in range(N):
    t=a0+(a1-a0)*i/(N-1); d=L*i/(N-1)
    x=cx+Rm*math.cos(math.radians(t)); y=cy-Rm*math.sin(math.radians(t))
    ring.append(P(x,y,cap(min(d,L-d),R)))
# arrow along axis
s2=math.sqrt(.5); T=(47,47); total=45; shaftLen=12; sh=5.4; hw=14.5
arrow=[]; N2=150
for i in range(N2):
    sd=total*i/(N2-1)
    x=T[0]-(total-sd)*s2; y=T[1]-(total-sd)*s2
    if sd<shaftLen: r=cap(sd,sh)
    elif sd<shaftLen+0.6: r=sh+(hw-sh)*(sd-shaftLen)/0.6
    else: r=hw*(total-sd)/(total-shaftLen-0.6)
    arrow.append(P(x,y,max(r,0)))
strokes=[ring,arrow]
i=g.find('l0=JSON.parse("')+len('l0=JSON.parse("'); j=g.find('")',i)
g=g[:i]+json.dumps(strokes,separators=(',',':'))+g[j:]
g=g.replace('l0=JSON.parse("','__oc=[[0.896,0.162,0.016],[0.93,0.296,0.012]],__zs=[1,.55],l0=JSON.parse("',1)
g=rep(g,'for(const o of v){const n=o.length,d=[],u=[];','for(const [__si,o] of v.entries()){const n=o.length,d=[],u=[];',1)
g=rep(g,'l.setAttribute("position",new o0(d,3)),l.setIndex(u),','l.setAttribute("position",new o0(d,3)),l.setAttribute("color",new o0(Array.from({length:n*t*3},(_,q)=>__oc[__si][q%3]),3)),l.setIndex(u),',1)
g=rep(g,'d.push(i+U*m*C,f+A*m*C,R*m*1)','d.push(i+U*m*C,f+A*m*C,R*m*__zs[__si])',1)
g=rep(g,'{color:"#e3e2ee",metalness:1,roughness:.04,clearcoat:1,clearcoatRoughness:.05,iridescence:1,iridescenceIOR:1.6,iridescenceThicknessRange:[180,560],envMapIntensity:1.05}',
        '{color:"#ffffff",vertexColors:!0,metalness:.08,roughness:.22,clearcoat:1,clearcoatRoughness:.03,iridescence:.15,iridescenceIOR:1.3,iridescenceThicknessRange:[180,380],envMapIntensity:1.0}',1)
for a,b in [("#ece9f6","#f6efe9"),("#f1edfb","#fbf1ea"),("#cfc3f3","#f3d3bd"),("#b3a4ea","#eab08a"),("#766e9c","#9c7a66"),("#2a2640","#2f241f"),("#3e395a","#4a3a30"),("#89cfe3","#ffd2a8"),("#a7a0cf","#d9b49c"),("#d8d2ef","#efdcd0"),("#7a73a4","#a4826f"),("#6fe6ff","#ffd27a"),("#ff9df0","#ffb38a"),("#4b3f8a","#8a4b1f"),('"#8b5cf6"','"#f37022"'),('"#4e8df7"','"#f7941d"')]:
    g=rep(g,a,b,label='env '+a)
open(f,'w').write(g)

# ---------- index.html ----------
f=ST+'/index.html'; h=open(f,encoding='utf-8').read()
h=rep(h,'<title>أفاق | وكيلك الذكي للاستيراد والشحن</title>','<title>اوشوب Oshop | وكيلك الذكي للتسوق والشحن</title>',1)
h=rep(h,'content="أفاق للشحن الجوي والبحري وآفاق موتورز: وكيل ذكي يدور على المنتج وأفضل سعر ويتفاوض مع المورد، ويوصلك لين ليبيا."','content="اوشوب للشحن والتجارة الإلكترونية: وكيل ذكي يدور على المنتج وأفضل سعر ويتفاوض مع المورد، شحن جوي وبحري وتوصيل لكل مدن ليبيا. فروعنا في مصراتة وطرابلس."',1)
h=rep(h,'content="#D6E8FB"','content="#FDE3D0"',1)
open(f,'w',encoding='utf-8').write(h)

# ---------- images ----------
B='/home/user/workspace/oshop/brand/'
shutil.copy(B+'oshop-mark.png',ST+'/img/oshop-mark.png')
shutil.copy(B+'oshop-mark-white.png',ST+'/img/oshop-mark-white.png')
shutil.copy(B+'favicon.png',ST+'/favicon.png')
import os
for x in ['afaaq-mark.png','afaaq-mark-white.png']:
    p=ST+'/img/'+x
    if os.path.exists(p): os.remove(p)

# ---------- server function ----------
f=ROOT+'/functions/api.func/index.cjs'; v=open(f,encoding='utf-8').read()
v=re.sub(r'\\u(06[0-9A-Fa-f]{2})',lambda m:chr(int(m.group(1),16)),v)
v=rep(v,'أنت تخدم "أفاق للشحن الجوي والبحري"، شركة ليبية فروعها في مصراتة وطرابلس وبنغازي، وتشحن من الصين وتركيا والإمارات وأمريكا والخليج وأوروبا.',
        'أنت تخدم "اوشوب Oshop للشحن والتجارة الإلكترونية"، شركة ليبية فروعها في مصراتة وطرابلس، تشتري للزبائن وتشحن من أشهر المواقع العالمية (مثل شي إن)، شحن جوي وبحري، وتوصيل لكل مدن ليبيا.',1,'sys1')
v=rep(v,'فروع أفاق: مصراتة (طريق يدر)، طرابلس، بنغازي.',
        'فروع اوشوب: مصراتة (الدائري الثاني، تقاطع المقاوبة) وطرابلس (الجرابة، قرب مطعم تقاسيم). للطلب والاستفسار واتساب: طرابلس 0947172021، مصراتة 0927172021.',1,'sys2')
v=rep(v,'["مصراتة","طرابلس","بنغازي"][r%3]','["مصراتة","طرابلس","مصراتة"][r%3]',1)
v=rep(v,'"AFQ-0000"','"OSH-0000"',1)
v=rep(v,'Afaaq（\\u0622\\u0641\\u0627\\u0642）','Oshop（اوشوب）') if 'Afaaq（\\u0622' in v else v
v=v.replace('Afaaq（آفاق）','Oshop（اوشوب）').replace('Afaaq\\uFF08آفاق\\uFF09','Oshop\\uFF08اوشوب\\uFF09')
v=v.replace('We are Afaaq','We are Oshop').replace('"Afaaq Agent"','"Oshop Agent"').replace('`afaaq-','`oshop-')
v=v.replace('آفاق','اوشوب').replace('أفاق','اوشوب')
left=[m.start() for m in re.finditer(r'(?i)afaaq|afaq|فاق|بنغازي',v)]
for p in left: print('LEFT server:',v[p-80:p+60])
open(f,'w',encoding='utf-8').write(v)
print('done')

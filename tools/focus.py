import re
ROOT='/home/user/workspace/oshop-site/.vercel/output'
def rep(s,old,new,count=None,label=''):
    n=s.count(old)
    if n==0: raise SystemExit(f'NOT FOUND [{label}]: {old[:90]}')
    if count is not None and n!=count: raise SystemExit(f'COUNT {n}!={count} [{label}]: {old[:90]}')
    return s.replace(old,new)
f=ROOT+'/static/assets/index-6ttDirym.js'; s=open(f,encoding='utf-8').read()

# new lucide icons: Baby, Heart
icons=('const Ob1=Z("Baby",[["path",{d:"M9 12h.01",key:"b1a"}],["path",{d:"M15 12h.01",key:"b1b"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",key:"b1c"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",key:"b1d"}]]),'
       'Oh1=Z("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"h1a"}]]);')
i=s.find('const be={violet:'); s=s[:i]+icons+s[i:]

# chips
a=s.find('Wl={shipping:[['); b=s.find('Wk=N.lazy(',a)
chips=('Wl={shipping:['
 '[{icon:Lk,color:be.pink,a:"فساتين",b:"من شي إن",q:"نبي فستان سهرة نسائي من شي إن، كم يجي لين ليبيا؟"},'
 '{icon:Ob1,color:be.violet,a:"مستلزمات الأطفال",b:"للمولود",q:"نبي مستلزمات أطفال للمولود، شن أحسن خيار وكم سعرها لين ليبيا؟"},'
 '{icon:Fy,color:be.blue,a:"عطور براندات",b:"من السعودية",q:"نبي عطر براند مشهور أصلي من السعودية، قارنلي الأسعار لين ليبيا"},'
 '{icon:Vp,color:be.orange,a:"صوّر منتج",b:"ونلقاه لك",q:""}],'
 '[{icon:Xu,color:be.green,a:"تتبع طلبي",b:"OSH-2025",q:"تتبعلي الطلب OSH-2025"},'
 '{icon:Dk,color:be.rose,a:"شنط ماركات",b:"أصلية",q:"نبي شنطة نسائية ماركة أصلية، قارنلي سعرها بين السعودية والإمارات وأمريكا"},'
 '{icon:Lk,color:be.pink,a:"ملابس تركية",b:"ماركات مشهورة",q:"نبي ملابس نسائية من ماركات تركية مشهورة من ترينديول، قارنلي الأسعار لين ليبيا"},'
 '{icon:Ob1,color:be.teal,a:"ملابس أطفال",b:"من شي إن",q:"نبي ملابس أطفال من شي إن لعمر سنتين، كم تجي لين ليبيا؟"}],'
 '[{icon:zy,color:be.rose,a:"براندات عالمية",b:"أصلية",q:"نبي منتج من براند عالمي معروف أصلي، قارنلي سعره بين السعودية وتركيا وأمريكا"},'
 '{icon:Lk,color:be.indigo,a:"عبايات",b:"من السعودية",q:"نبي عباية سوداء من السعودية، قارنلي الأسعار لين ليبيا"},'
 '{icon:Dk,color:be.orange,a:"أحذية نسائية",b:"ماركات",q:"نبي حذاء نسائي ماركة أصلية، قارنلي سعره بين السعودية وتركيا وأمريكا"},'
 '{icon:Ro,color:be.green,a:"كم ياخذ",b:"طلب شي إن؟",q:"كم ياخذ طلب شي إن لين ليبيا؟"}]'
 '],get motors(){return this.shipping}},')
s=s[:a]+chips+s[b:]

# remove motors toggle & mode
s=rep(s,'c.jsx(Uk,{motors:m,onClick:()=>r({brand:m?"shipping":"motors"})})','c.jsx(Uk,{motors:!1,onClick:()=>s("/settings")})',1)
s=rep(s,'children:["اوشوب ",c.jsx("span",{style:{color:"var(--accent)"},children:"للشحن"})]','children:["اوشوب ",c.jsx("span",{style:{color:"var(--accent)"},children:"للتسوق والشحن"})]',1)
s=rep(s,'m=n.brand==="motors",g=(x,C)=>{a.newThread(),s("/chat"),a.send(x,C,n.brand,n.persona)}','m=!1,g=(x,C)=>{a.newThread(),s("/chat"),a.send(x,C,"shipping",n.persona)}',1)
s=rep(s,'Wl[n.brand]','Wl.shipping',3)
s=rep(s,'r.send(se,de,n.brand,n.persona)','r.send(se,de,"shipping",n.persona)',1)
s=rep(s,'r.send(de,void 0,n.brand,n.persona,','r.send(de,void 0,"shipping",n.persona,',1)
s=rep(s,'r.send($,void 0,n.brand,n.persona)','r.send($,void 0,"shipping",n.persona)',1)
s=rep(s,'r.brand==="motors"?"اوشوب موتورز":"اوشوب للشحن"','"اوشوب للتسوق والشحن"',2)
s=rep(s,'"اوشوب للشحن · اوشوب موتورز · الإصدار 1.0"','"اوشوب Oshop · Shipping & E-commerce · الإصدار 1.0"',1)
# settings: remove القسم block
a=s.find('c.jsx(Et,{label:"القسم",'); b=s.find('c.jsx(Et,{label:"اهتماماتك"',a); assert a>0 and b>a
s=s[:a]+s[b:]
s=rep(s,'const f=r.brand==="motors"?["قطع غيار","جنوط","بطاريات","استيراد سيارات","كشافات"]:["إلكترونيات","باور بانك","ملابس","تغليف","أدوات منزلية"]',
        'const f=["أزياء نسائية","عطور براندات","ملابس تركية","مستلزمات الأطفال","ماركات عالمية","شنط وأحذية"]',1)
s=rep(s,'role:"وكيلة الاستيراد"','role:"وكيلة التسوق"',1)
s=rep(s,'role:"وكيل الاستيراد"','role:"وكيل التسوق"',1)
# hero
s=rep(s,'children:["استيراد ",c.jsx("span",{className:"grad",children:"سهل"})','children:["تسوّق ",c.jsx("span",{className:"grad",children:"سهل"})',1)
s=rep(s,'["وكيلك يدور على المنتج، يجيب أفضل سعر،",c.jsx("br",{}),"ويتفاوض مع المورد. كله من تلفونك."]','["عطور ماركات، ملابس تركية، ومستلزمات أطفال،",c.jsx("br",{}),"نجيبوهملك لين ليبيا. كله من تلفونك."]',1)
# followups
s=rep(s,'compare:["أرخص واحد بالجملة من الصين","كم يوصلني لين ليبيا؟","دورلي على جودة أعلى"]','compare:["دورلي على ماركة أصلية","كم يوصلني لين ليبيا؟","فيه أرخص منه؟"]',1)
s=rep(s,'track:["متى تنزل الجمارك؟","غيّر فرع الاستلام"]','track:["متى يوصل طلبي؟","غيّر فرع الاستلام"]',1)
s=rep(s,'children:"نبي 300 باور بانك"','children:"نبي فستان سهرة من شي إن"',1)
s=rep(s,'children:"تمام، لقيتلك 3 موردين. الأرخص 17.27 د.ل للحبة."','children:"تمام، لقيتلك 3 خيارات. الأرخص 185 د.ل لين ليبيا."',1)
open(f,'w',encoding='utf-8').write(s)

# server
f=ROOT+'/functions/api.func/index.cjs'; v=open(f,encoding='utf-8').read()
old='أنت تخدم "اوشوب Oshop للشحن والتجارة الإلكترونية"، شركة ليبية فروعها في مصراتة وطرابلس، تشتري للزبائن وتشحن من أشهر المواقع العالمية (مثل شي إن)، شحن جوي وبحري، وتوصيل لكل مدن ليبيا.'
new=('أنت تخدم "اوشوب Oshop للشحن والتجارة الإلكترونية"، شركة ليبية فروعها في مصراتة وطرابلس، تشتري للزبائن وتشحن من أشهر المواقع العالمية، شحن جوي وبحري، وتوصيل لكل مدن ليبيا. '
     'تركيز اوشوب: الأزياء النسائية، العطور من البراندات المشهورة (خاصة من السعودية)، الملابس من الماركات التركية المشهورة، البراندات العالمية المعروفة الأصلية، مستلزمات الأطفال، الشنط والأحذية، من شي إن والمواقع السعودية والتركية ومواقع الماركات. '
     'أغلب الزبائن أفراد يطلبوا حبة أو كم حبة، مش تجار جملة.')
v=rep(v,old,new,1,'sys')
v=rep(v,'شغلك: تفهم شن يبي الزبون، تدور على أرخص وأضمن مورد، تحسب التكلفة لين ليبيا بالدينار، وتجهز رسالة تفاوض مع المورد.',
        'شغلك: تفهم شن يبي الزبون، تدورله على المنتج والماركة الأصلية بأحسن سعر، وتحسب التكلفة لين ليبيا بالدينار.',1,'job')
v=rep(v,'- لو الزبون طلب منتج للاستيراد بالجملة:','- لطلبات الأفراد (ملابس، مستلزمات أطفال، عطور، مكياج، شنط، أحذية، ماركات): استخدم compare_markets. للعطور ركز على أمازون السعودية ونون، وللملابس التركية ركز على ترينديول (اكتب query_tr بالتركي واسم الماركة لو ذكرها)، وللبراندات العالمية قارن السعودية وتركيا وأمريكا. لو الطلب عام (عطر براند، ملابس تركية، شنطة ماركة، حذاء) ابحث طول بكلمة عامة ومعروفة (مثلاً: original brand perfume، kadın elbise) واعرض النتائج، وبعدها اسأله لو يبي ماركة أو مقاس معين. ما ترجعش بسؤال بدون ما تبحث. لو قال شي إن، قوله يبعت رابط المنتج أو صورته وموظف اوشوب يأكدله السعر.\n- لو الزبون طلب منتج بالجملة (كمية كبيرة لمحل):',1,'rule')
v=rep(v,'[\"alibaba\",\"noon_ae\",\"amazon_ae\",\"amazon_sa\",\"trendyol\",\"amazon_us\"]'.replace('\\"','"'),'["amazon_sa","noon_ae","amazon_ae","trendyol","amazon_us"]',1,'markets')
v=rep(v,'الافتراضي: alibaba, noon_ae, amazon_ae, amazon_sa, trendyol, amazon_us','الافتراضي: amazon_sa, noon_ae, amazon_ae, trendyol, amazon_us',1)
open(f,'w',encoding='utf-8').write(v)
print('ok')

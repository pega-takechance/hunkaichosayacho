document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // Init Date & Time
    // -------------------------
    const dateInput = document.getElementById('form-date');
    const startInput = document.getElementById('form-time-start');
    
    // Set today's date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;

    // Set current time as start
    const hh = String(today.getHours()).padStart(2, '0');
    const mins = String(today.getMinutes()).padStart(2, '0');
    startInput.value = `${hh}:${mins}`;

    // -------------------------
    // Area Card Logic
    // -------------------------
    const areasContainer = document.getElementById('areas-container');
    const addAreaBtn = document.getElementById('add-area-btn');
    const countBadge = document.getElementById('area-count');
    let areaCount = 0;

    const createAreaCard = () => {
        areaCount++;
        const idx = areaCount;
        const card = document.createElement('article');
        card.className = "glass-card p-5 animate-slide-up area-card relative overflow-hidden";
        
        card.innerHTML = `
            <div class="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-bl-lg">NO. ${idx}</div>
            
            <div class="flex justify-between items-center mb-5 mt-2">
                <div class="flex items-center gap-3 w-full">
                    <label class="font-bold text-slate-800 text-lg whitespace-nowrap">区域</label>
                    <input type="text" class="custom-input block w-20 text-center font-bold text-lg border-b-2 border-slate-300 focus:border-emerald-500 bg-transparent outline-none area-no" value="${idx}">
                </div>
                <button type="button" class="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors remove-btn" title="区域を削除">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
            
            <div class="space-y-6">
                <!-- 植生・下層植生 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">植生タイプ <span class="text-[10px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">最大3種</span></label>
                        <div class="grid grid-cols-6 gap-1.5 flex-1">
                            ${['A','B','C','D','E','F','G','H','I','J','K','L'].map(v => `
                                <label class="relative flex-1 text-center cursor-pointer">
                                    <input type="checkbox" value="${v}" class="peer sr-only veg-cb">
                                    <span class="flex items-center justify-center h-8 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:border-emerald-500 shadow-sm transition-colors">${v}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center space-y-3">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-500 w-10">一般</span>
                            <div class="flex flex-1 gap-1 radio-group h-8">
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-general-${idx}" value="極多" class="peer sr-only">
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-600 bg-white border border-slate-200 rounded-md peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-colors shadow-sm">極多</span>
                                </label>
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-general-${idx}" value="多い" class="peer sr-only">
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-600 bg-white border border-slate-200 rounded-md peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-colors shadow-sm">多い</span>
                                </label>
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-general-${idx}" value="少ない" class="peer sr-only">
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-600 bg-white border border-slate-200 rounded-md peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-colors shadow-sm">少ない</span>
                                </label>
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-general-${idx}" value="なし" class="peer sr-only" checked>
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-400 bg-white border border-slate-200 rounded-md peer-checked:bg-slate-100 peer-checked:text-slate-600 transition-colors shadow-sm">なし</span>
                                </label>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-500 w-10">ササ</span>
                            <div class="flex flex-1 gap-1 radio-group h-8">
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-sasa-${idx}" value="多い" class="peer sr-only">
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-600 bg-white border border-slate-200 rounded-md peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-colors shadow-sm">多い</span>
                                </label>
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-sasa-${idx}" value="少ない" class="peer sr-only">
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-600 bg-white border border-slate-200 rounded-md peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-colors shadow-sm">少ない</span>
                                </label>
                                <label class="flex-1 text-center cursor-pointer h-full">
                                    <input type="radio" name="under-veg-sasa-${idx}" value="なし" class="peer sr-only" checked>
                                    <span class="flex items-center justify-center font-bold h-full text-xs text-slate-400 bg-white border border-slate-200 rounded-md peer-checked:bg-slate-100 peer-checked:text-slate-600 transition-colors shadow-sm">なし</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- シカ生体 -->
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">シカ生体 (カウント)</label>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                            <span class="text-sm font-medium text-slate-700 border-l-4 border-emerald-500 pl-2">目撃</span>
                            <div class="flex items-center gap-1">
                                <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-lg flex justify-center items-center dec-btn transition-colors">-</button>
                                <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input sika-sighting" value="0" min="0">
                                <button type="button" class="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold text-lg flex justify-center items-center inc-btn transition-colors">+</button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                            <span class="text-sm font-medium text-slate-700 border-l-4 border-emerald-500 pl-2">足跡</span>
                            <div class="flex items-center gap-1">
                                <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-lg flex justify-center items-center dec-btn transition-colors">-</button>
                                <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input sika-footprint" value="0" min="0">
                                <button type="button" class="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold text-lg flex justify-center items-center inc-btn transition-colors">+</button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                            <span class="text-sm font-medium text-slate-700 border-l-4 border-emerald-500 pl-2">鳴き声</span>
                            <div class="flex items-center gap-1">
                                <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-lg flex justify-center items-center dec-btn transition-colors">-</button>
                                <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input sika-vocal" value="0" min="0">
                                <button type="button" class="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold text-lg flex justify-center items-center inc-btn transition-colors">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 糞塊 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                        <label class="block text-xs font-bold text-orange-800 uppercase mb-3 flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-orange-500"></span> 糞塊: 10粒以上
                        </label>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-orange-200 shadow-sm">
                                <span class="text-sm font-medium text-orange-800 border-l-4 border-orange-500 pl-2">新</span>
                                <div class="flex items-center gap-1">
                                    <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex justify-center items-center dec-btn transition-colors">-</button>
                                    <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input dung-over-new" value="0" min="0">
                                    <button type="button" class="w-8 h-8 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold flex justify-center items-center inc-btn transition-colors">+</button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-orange-200 shadow-sm">
                                <span class="text-sm font-medium text-orange-800 border-l-4 border-orange-500 pl-2">中</span>
                                <div class="flex items-center gap-1">
                                    <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex justify-center items-center dec-btn transition-colors">-</button>
                                    <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input dung-over-med" value="0" min="0">
                                    <button type="button" class="w-8 h-8 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold flex justify-center items-center inc-btn transition-colors">+</button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-orange-200 shadow-sm">
                                <span class="text-sm font-medium text-orange-800 border-l-4 border-orange-500 pl-2">旧</span>
                                <div class="flex items-center gap-1">
                                    <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex justify-center items-center dec-btn transition-colors">-</button>
                                    <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input dung-over-old" value="0" min="0">
                                    <button type="button" class="w-8 h-8 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold flex justify-center items-center inc-btn transition-colors">+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
                        <label class="block text-xs font-bold text-amber-800 uppercase mb-3 flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-amber-500"></span> 糞塊: 10粒未満
                        </label>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-sm">
                                <span class="text-sm font-medium text-amber-800 border-l-4 border-amber-500 pl-2">新</span>
                                <div class="flex items-center gap-1">
                                    <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex justify-center items-center dec-btn transition-colors">-</button>
                                    <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input dung-under-new" value="0" min="0">
                                    <button type="button" class="w-8 h-8 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 font-bold flex justify-center items-center inc-btn transition-colors">+</button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-sm">
                                <span class="text-sm font-medium text-amber-800 border-l-4 border-amber-500 pl-2">中</span>
                                <div class="flex items-center gap-1">
                                    <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex justify-center items-center dec-btn transition-colors">-</button>
                                    <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input dung-under-med" value="0" min="0">
                                    <button type="button" class="w-8 h-8 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 font-bold flex justify-center items-center inc-btn transition-colors">+</button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-sm">
                                <span class="text-sm font-medium text-amber-800 border-l-4 border-amber-500 pl-2">旧</span>
                                <div class="flex items-center gap-1">
                                    <button type="button" class="w-8 h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex justify-center items-center dec-btn transition-colors">-</button>
                                    <input type="number" class="w-10 text-center font-bold text-slate-800 bg-transparent outline-none num-input dung-under-old" value="0" min="0">
                                    <button type="button" class="w-8 h-8 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 font-bold flex justify-center items-center inc-btn transition-colors">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 備考 -->
                <div class="pt-2">
                    <input type="text" class="custom-input w-full border border-slate-200 rounded-lg p-3 outline-none text-sm remark" placeholder="備考 (気づいたことなど...)">
                </div>
            </div>
        `;

        // Vegetation Logic
        card.querySelectorAll('.veg-cb').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const checkedCount = card.querySelectorAll('.veg-cb:checked').length;
                if (checkedCount > 3) {
                    e.target.checked = false;
                    // Provide short feedback inside the card without obtrusive alerts
                    const label = card.querySelector('label:has(.veg-cb)');
                    label.parentElement.parentElement.classList.add('ring-2', 'ring-red-400', 'transition-all');
                    setTimeout(() => label.parentElement.parentElement.classList.remove('ring-2', 'ring-red-400'), 500);
                }
            });
        });

        // Counter Logic
        card.querySelectorAll('.inc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.currentTarget.parentElement.querySelector('.num-input');
                input.value = parseInt(input.value) + 1;
            });
        });
        card.querySelectorAll('.dec-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.currentTarget.parentElement.querySelector('.num-input');
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1;
                }
            });
        });
        card.querySelectorAll('.num-input').forEach(input => {
            input.addEventListener('change', (e) => {
                if (parseInt(e.target.value) < 0 || isNaN(parseInt(e.target.value))) {
                    e.target.value = 0;
                }
            });
        });

        card.querySelector('.remove-btn').addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.remove();
                updateCount();
            }, 200);
        });

        areasContainer.appendChild(card);
        updateCount();
    };

    const updateCount = () => {
        countBadge.textContent = document.querySelectorAll('.area-card').length;
    };

    // Initialize with one card
    createAreaCard();
    
    addAreaBtn.addEventListener('click', () => {
        createAreaCard();
        // Scroll to the bottom gently
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    });

    // -------------------------
    // State Management & Export
    // -------------------------
    const collectData = () => {
        const dateVal = document.getElementById('form-date').value;
        const timeStart = document.getElementById('form-time-start').value;
        const timeEnd = document.getElementById('form-time-end').value;
        const surveyor = document.getElementById('form-surveyor').value;
        const weather = document.getElementById('form-weather').value;
        const meshNo = document.getElementById('form-mesh').value;
        const impossible = document.querySelector('input[name="form-impossible"]:checked')?.value || "";

        const areaData = [];
        document.querySelectorAll('.area-card').forEach(card => {
            const no = card.querySelector('.area-no').value;
            const veg = Array.from(card.querySelectorAll('.veg-cb:checked')).map(cb => cb.value).join(', ');
            const underVegGen = card.querySelector('input[name^="under-veg-general-"]:checked')?.value || "";
            const underVegSasa = card.querySelector('input[name^="under-veg-sasa-"]:checked')?.value || "";
            
            const sSight = card.querySelector('.sika-sighting').value;
            const sFoot = card.querySelector('.sika-footprint').value;
            const sVoc = card.querySelector('.sika-vocal').value;

            const doNew = card.querySelector('.dung-over-new').value;
            const doMed = card.querySelector('.dung-over-med').value;
            const doOld = card.querySelector('.dung-over-old').value;

            const duNew = card.querySelector('.dung-under-new').value;
            const duMed = card.querySelector('.dung-under-med').value;
            const duOld = card.querySelector('.dung-under-old').value;

            const remark = card.querySelector('.remark').value;

            if(no) {
                areaData.push({
                    "区域番号": no, "植生タイプ": veg, "下層植生(一般)": underVegGen, "下層植生(ササ)": underVegSasa,
                    "生体:目撃": sSight, "生体:足跡": sFoot, "生体:鳴声": sVoc,
                    "糞塊10+:新": doNew, "糞塊10+:中": doMed, "糞塊10+:旧": doOld,
                    "糞塊10-:新": duNew, "糞塊10-:中": duMed, "糞塊10-:旧": duOld, "備考": remark
                });
            }
        });

        return {
            dateVal, timeStart, timeEnd, surveyor, weather, meshNo, impossible, areaData
        };
    };

    const loadData = (data) => {
        if (!data) return;
        if (data.dateVal) document.getElementById('form-date').value = data.dateVal;
        if (data.timeStart) document.getElementById('form-time-start').value = data.timeStart;
        if (data.timeEnd) document.getElementById('form-time-end').value = data.timeEnd;
        if (data.surveyor) document.getElementById('form-surveyor').value = data.surveyor;
        if (data.weather) document.getElementById('form-weather').value = data.weather;
        if (data.meshNo) document.getElementById('form-mesh').value = data.meshNo;
        if (data.impossible) {
            const imp = document.querySelectorAll('input[name="form-impossible"]');
            imp.forEach(r => { if(r.value === data.impossible) r.checked = true; });
        }

        if (data.areaData && data.areaData.length > 0) {
            areasContainer.innerHTML = '';
            areaCount = 0;
            data.areaData.forEach(a => {
                createAreaCard();
                const cards = document.querySelectorAll('.area-card');
                const card = cards[cards.length - 1];
                const idx = areaCount;

                card.querySelector('.area-no').value = a["区域番号"] || String(idx);
                
                if (a["植生タイプ"]) {
                    const vegs = a["植生タイプ"].split(', ');
                    vegs.forEach(v => {
                        const cb = card.querySelector(`.veg-cb[value="${v}"]`);
                        if (cb) cb.checked = true;
                    });
                }
                
                const genReds = card.querySelectorAll(`input[name="under-veg-general-${idx}"]`);
                genReds.forEach(r => { if(r.value === a["下層植生(一般)"]) r.checked = true; });

                const sasReds = card.querySelectorAll(`input[name="under-veg-sasa-${idx}"]`);
                sasReds.forEach(r => { if(r.value === a["下層植生(ササ)"]) r.checked = true; });

                card.querySelector('.sika-sighting').value = a["生体:目撃"] || 0;
                card.querySelector('.sika-footprint').value = a["生体:足跡"] || 0;
                card.querySelector('.sika-vocal').value = a["生体:鳴声"] || 0;

                card.querySelector('.dung-over-new').value = a["糞塊10+:新"] || 0;
                card.querySelector('.dung-over-med').value = a["糞塊10+:中"] || 0;
                card.querySelector('.dung-over-old').value = a["糞塊10+:旧"] || 0;

                card.querySelector('.dung-under-new').value = a["糞塊10-:新"] || 0;
                card.querySelector('.dung-under-med').value = a["糞塊10-:中"] || 0;
                card.querySelector('.dung-under-old').value = a["糞塊10-:旧"] || 0;

                card.querySelector('.remark').value = a["備考"] || "";
            });
            updateCount();
        }
    };

    const doExportExcel = (dataObj) => {
        const { dateVal, timeStart, timeEnd, surveyor, weather, meshNo, impossible, areaData } = dataObj;
        
        const wsData = [
            {"A": "様式1-2 ニホンジカ糞塊密度調査票"},
            {},
            {"A": "調査日", "B": dateVal},
            {"A": "時刻", "B": timeStart + " ~ " + timeEnd},
            {"A": "調査者", "B": surveyor},
            {"A": "天気", "B": weather},
            {"A": "調査メッシュNo.", "B": meshNo},
            {"A": "調査不能箇所", "B": impossible},
            {},
            {
                "A": "区域番号", "B": "植生タイプ", "C": "下層植生(一般)", "D": "下層植生(ササ)", 
                "E": "生体:目撃", "F": "生体:足跡", "G": "生体:鳴声",
                "H": "糞塊10+:新", "I": "糞塊10+:中", "J": "糞塊10+:旧",
                "K": "糞塊10-:新", "L": "糞塊10-:中", "M": "糞塊10-:旧", "N": "備考"
            }
        ];

        areaData.forEach(a => {
            wsData.push({
                "A": a["区域番号"], "B": a["植生タイプ"], "C": a["下層植生(一般)"], "D": a["下層植生(ササ)"],
                "E": a["生体:目撃"], "F": a["生体:足跡"], "G": a["生体:鳴声"],
                "H": a["糞塊10+:新"], "I": a["糞塊10+:中"], "J": a["糞塊10+:旧"],
                "K": a["糞塊10-:新"], "L": a["糞塊10-:中"], "M": a["糞塊10-:旧"], "N": a["備考"]
            });
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(wsData, {skipHeader: true});
        
        ws['!cols'] = [
            { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
            { wch: 10 }, { wch: 10 }, { wch: 10 },
            { wch: 12 }, { wch: 12 }, { wch: 12 },
            { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 30 }
        ];

        XLSX.utils.book_append_sheet(wb, ws, "ニホンジカ糞塊密度調査票");

        let filename = "糞塊密度調査_";
        if (dateVal) filename += dateVal.replace(/-/g, "");
        else filename += "未設定";
        filename += ".xlsx";

        XLSX.writeFile(wb, filename);
    };

    // -------------------------
    // Save & Flow Actions
    // -------------------------
    document.getElementById('btn-suspend')?.addEventListener('click', () => {
        const data = collectData();
        localStorage.setItem('sikaSurveySave', JSON.stringify(data));
        alert('データを保存して中断しました。\\n※ ブラウザを閉じても次回再開できます。');
        window.location.reload();
    });

    document.getElementById('btn-finish')?.addEventListener('click', () => {
        const data = collectData();
        doExportExcel(data);
        localStorage.removeItem('sikaSurveySave');
        setTimeout(() => {
            if(confirm('調査を終了しました。新しい調査を始めますか？')) {
                window.location.reload();
            }
        }, 1000);
    });

    // -------------------------
    // Start Screen Logic
    // -------------------------
    const startScreen = document.getElementById('start-screen');
    const mainApp = document.getElementById('main-app');
    const resumeBtn = document.getElementById('btn-resume-survey');
    const startBtn = document.getElementById('btn-start-survey');

    if (startScreen && mainApp) {
        const savedDataStr = localStorage.getItem('sikaSurveySave');
        if (savedDataStr) {
            resumeBtn.classList.remove('hidden');
        }

        const showMainApp = () => {
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        };

        startBtn.addEventListener('click', () => {
            if(savedDataStr && !confirm('保存されている中断データを破棄して新規に開始しますか？')) {
                return;
            }
            localStorage.removeItem('sikaSurveySave');
            showMainApp();
        });

        resumeBtn.addEventListener('click', () => {
            try {
                const savedData = JSON.parse(savedDataStr);
                loadData(savedData);
                showMainApp();
            } catch(e) {
                console.error('Failed to load saved data:', e);
                alert('データの読み込みに失敗しました。新規で開始します。');
                showMainApp();
            }
        });
    }
});

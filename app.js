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
                <div class="space-y-4">
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
                        <div class="mt-3 text-sm text-slate-500 leading-tight bg-white p-2 rounded border border-slate-100">
                            <span class="font-bold text-emerald-700">凡例:</span> A:落葉広葉樹林 B:常緑広葉樹林 C:マツ林 D:伐採跡地 E:スギ・ヒノキ幼齢林 F:スギ・ヒノキ老齢林 G:スギ・ヒノキ植林(制限無) H:草地 I:カラマツ林 J:常緑針葉樹林 K:竹林 L:その他
                        </div>
                    </div>
                    
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center space-y-3">
                        <label class="block text-xs font-bold text-slate-500 uppercase">下層植生</label>
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
        const projectName = document.getElementById('form-project')?.value || "";
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
            dateVal, projectName, timeStart, timeEnd, surveyor, weather, meshNo, impossible, areaData
        };
    };

    const loadData = (data) => {
        if (!data) return;
        if (data.dateVal) document.getElementById('form-date').value = data.dateVal;
        if (data.projectName !== undefined && document.getElementById('form-project')) document.getElementById('form-project').value = data.projectName;
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
        const { dateVal, projectName, timeStart, timeEnd, surveyor, weather, meshNo, impossible, areaData } = dataObj;
        
        const wsData = [
            {"A": "様式1-2 ニホンジカ糞塊密度調査票"},
            {},
            {"A": "調査日", "B": dateVal},
            {"A": "業務名", "B": projectName || "未設定"},
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

        // --- Create Analysis Summary Sheet ---
        let c = {
            veg: {'A':0,'B':0,'C':0,'D':0,'E':0,'F':0,'G':0,'H':0,'I':0,'J':0,'K':0,'L':0},
            underGen: {'極多':0,'多い':0,'少ない':0,'なし':0},
            underSasa: {'多い':0,'少ない':0,'なし':0},
            sika: { sight: 0, foot: 0, vocal: 0 },
            dungO: { new: 0, med: 0, old: 0 },
            dungU: { new: 0, med: 0, old: 0 }
        };

        areaData.forEach(area => {
            const vegArr = area["植生タイプ"].split(', ').filter(v => v);
            vegArr.forEach(v => { if (c.veg[v] !== undefined) c.veg[v]++; });
            if (c.underGen[area["下層植生(一般)"]] !== undefined) c.underGen[area["下層植生(一般)"]]++;
            if (c.underSasa[area["下層植生(ササ)"]] !== undefined) c.underSasa[area["下層植生(ササ)"]]++;
            c.sika.sight += parseInt(area["生体:目撃"]) || 0;
            c.sika.foot += parseInt(area["生体:足跡"]) || 0;
            c.sika.vocal += parseInt(area["生体:鳴声"]) || 0;
            c.dungO.new += parseInt(area["糞塊10+:新"]) || 0;
            c.dungO.med += parseInt(area["糞塊10+:中"]) || 0;
            c.dungO.old += parseInt(area["糞塊10+:旧"]) || 0;
            c.dungU.new += parseInt(area["糞塊10-:新"]) || 0;
            c.dungU.med += parseInt(area["糞塊10-:中"]) || 0;
            c.dungU.old += parseInt(area["糞塊10-:旧"]) || 0;
        });

        const wsDataAnalysis = [
            {"A": "■ メッシュ単位集計結果", "B": "業務名:", "C": projectName || "未設定", "D": "メッシュNo:", "E": meshNo},
            {},
            {"A": "【植生タイプ出現数】"},
            {"A": "A", "B": "B", "C": "C", "D": "D", "E": "E", "F": "F", "G": "G", "H": "H", "I": "I", "J": "J", "K": "K", "L": "L"},
            {"A": c.veg['A'], "B": c.veg['B'], "C": c.veg['C'], "D": c.veg['D'], "E": c.veg['E'], "F": c.veg['F'], "G": c.veg['G'], "H": c.veg['H'], "I": c.veg['I'], "J": c.veg['J'], "K": c.veg['K'], "L": c.veg['L']},
            {},
            {"A": "【下層植生カウント】"},
            {"A": "区分", "B": "極多", "C": "多い", "D": "少ない", "E": "なし"},
            {"A": "一般", "B": c.underGen['極多'], "C": c.underGen['多い'], "D": c.underGen['少ない'], "E": c.underGen['なし']},
            {"A": "ササ", "B": "-", "C": c.underSasa['多い'], "D": c.underSasa['少ない'], "E": c.underSasa['なし']},
            {},
            {"A": "【シカ生体 カウント】"},
            {"A": "項目", "B": "目撃", "C": "足跡", "D": "鳴声"},
            {"A": "シカ生体", "B": c.sika.sight, "C": c.sika.foot, "D": c.sika.vocal},
            {},
            {"A": "【シカ糞塊 カウント】"},
            {"A": "項目", "B": "新", "C": "中", "D": "旧"},
            {"A": "糞塊10+", "B": c.dungO.new, "C": c.dungO.med, "D": c.dungO.old},
            {"A": "糞塊10-", "B": c.dungU.new, "C": c.dungU.med, "D": c.dungU.old}
        ];

        const ws2 = XLSX.utils.json_to_sheet(wsDataAnalysis, {skipHeader: true});
        XLSX.utils.book_append_sheet(wb, ws2, "集計分析表");
        // ----------------------------------------

        let filename = "糞塊密度調査_";
        if (dateVal) filename += dateVal.replace(/-/g, "");
        else filename += "未設定";
        filename += ".xlsx";

        XLSX.writeFile(wb, filename);
    };

    // -------------------------
    // Save & Flow Actions
    // -------------------------
    document.getElementById('btn-abort')?.addEventListener('click', () => {
        if(confirm('入力中のデータを保存せずに破棄してスタート画面に戻ります。\\nよろしいですか？')) {
            localStorage.removeItem('sikaSurveySave');
            window.location.reload();
        }
    });

    document.getElementById('btn-suspend')?.addEventListener('click', () => {
        const data = collectData();
        localStorage.setItem('sikaSurveySave', JSON.stringify(data));
        alert('データを保存して中断しました。\\n※ ブラウザを閉じても次回再開できます。');
        window.location.reload();
    });

    document.getElementById('btn-finish')?.addEventListener('click', () => {
        const data = collectData();
        doExportExcel(data);

        // --- Save to historical DB ---
        const dbStr = localStorage.getItem('sikaSurveyDB');
        const db = dbStr ? JSON.parse(dbStr) : [];
        data.savedAt = new Date().toISOString();
        db.push(data);
        localStorage.setItem('sikaSurveyDB', JSON.stringify(db));
        // -----------------------------

        localStorage.removeItem('sikaSurveySave');
        setTimeout(() => {
            alert('調査データを保存し、終了しました。\\nスタート画面に戻ります。');
            window.location.reload();
        }, 100);
    });

    // -------------------------
    // Start Screen & Analysis
    // -------------------------
    const startScreen = document.getElementById('start-screen');
    const mainApp = document.getElementById('main-app');
    const resumeBtn = document.getElementById('btn-resume-survey');
    const startBtn = document.getElementById('btn-start-survey');

    // Analysis elements
    const analyzeBtn = document.getElementById('btn-analyze-survey');
    const analysisModal = document.getElementById('analysis-modal');
    const closeAnalysisBtn = document.getElementById('btn-close-analysis');
    const meshSelect = document.getElementById('analysis-mesh-select');
    const analysisContent = document.getElementById('analysis-content');

    if (startScreen && mainApp) {
        const savedDataStr = localStorage.getItem('sikaSurveySave');
        if (savedDataStr) {
            resumeBtn.classList.remove('hidden');
        }

        const surveyDBStr = localStorage.getItem('sikaSurveyDB');
        const surveyDB = surveyDBStr ? JSON.parse(surveyDBStr) : [];
        if (surveyDB.length > 0) {
            if (analyzeBtn) analyzeBtn.classList.remove('hidden');
            if (document.getElementById('btn-manage-logs')) document.getElementById('btn-manage-logs').classList.remove('hidden');
        }

        const extractedProjects = [...new Set(surveyDB.map(s => (s.projectName && s.projectName.trim() !== '') ? s.projectName : '業務設定なし'))];
        const startProjSelect = document.getElementById('start-proj-select');
        const startProjInput = document.getElementById('start-proj-input');
        if (startProjSelect && extractedProjects.length > 0) {
            startProjSelect.innerHTML = extractedProjects.map(p => `<option value="${p}">${p}</option>`).join('') + `<option value="NEW" class="text-emerald-600 font-bold">【＋新規に入力する】</option>`;
            startProjSelect.value = extractedProjects[0];
            if (startProjInput) startProjInput.classList.add('hidden');
        }

        startProjSelect?.addEventListener('change', (e) => {
            if (e.target.value === 'NEW') {
                if (startProjInput) {
                    startProjInput.classList.remove('hidden');
                    startProjInput.focus();
                }
            } else {
                if (startProjInput) startProjInput.classList.add('hidden');
            }
        });

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
            
            const startProjSelect = document.getElementById('start-proj-select');
            const startProjInput = document.getElementById('start-proj-input');
            const targetProjForm = document.getElementById('form-project');
            if (startProjSelect && targetProjForm) {
                if (startProjSelect.value === 'NEW') {
                    targetProjForm.value = startProjInput ? startProjInput.value : '';
                } else {
                    targetProjForm.value = startProjSelect.value;
                }
            }
            
            showMainApp();
            addAreaCard();
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

        // Analysis Modal interactions
        const projectSelect = document.getElementById('analysis-project-select');
        
        analyzeBtn?.addEventListener('click', () => {
            const currentDBStr = localStorage.getItem('sikaSurveyDB');
            const currentDB = currentDBStr ? JSON.parse(currentDBStr) : [];
            
            analysisModal.classList.remove('hidden');
            // Extract unique projects
            const projects = [...new Set(currentDB.map(s => (s.projectName && s.projectName.trim() !== '') ? s.projectName : '業務設定なし'))];
            if (projectSelect) {
                projectSelect.innerHTML = `<option value="">-- 対象業務を選択 --</option>` + 
                    projects.map(p => `<option value="${p}">${p}</option>`).join('');
            }
            meshSelect.innerHTML = `<option value="">-- メッシュを選択 --</option>`;
            meshSelect.disabled = true;
            analysisContent.innerHTML = '<div class="text-slate-400 text-center py-8">対象業務を選択してください</div>';
        });

        closeAnalysisBtn?.addEventListener('click', () => {
            analysisModal.classList.add('hidden');
        });

        projectSelect?.addEventListener('change', () => {
            const pSel = projectSelect.value;
            if (!pSel) {
                meshSelect.innerHTML = `<option value="">-- メッシュを選択 --</option>`;
                meshSelect.disabled = true;
                analysisContent.innerHTML = '<div class="text-slate-400 text-center py-8">対象業務を選択してください</div>';
                return;
            }

            const currentDBStr = localStorage.getItem('sikaSurveyDB');
            const currentDB = currentDBStr ? JSON.parse(currentDBStr) : [];
            const filteredByProject = currentDB.filter(s => ((s.projectName && s.projectName.trim() !== '') ? s.projectName : '業務設定なし') === pSel);
            
            const meshes = [...new Set(filteredByProject.map(s => (s.meshNo && s.meshNo.trim() !== '') ? s.meshNo : '名称未設定'))];
            meshSelect.innerHTML = `<option value="">-- メッシュを選択 --</option>` + 
                meshes.map(m => `<option value="${m}">${m}</option>`).join('');
            meshSelect.disabled = false;
            analysisContent.innerHTML = '<div class="text-slate-400 text-center py-8">メッシュを選択してください</div>';
        });

        meshSelect?.addEventListener('change', () => {
            const pSel = projectSelect ? projectSelect.value : null;
            const mSel = meshSelect.value;
            if (!mSel) {
                analysisContent.innerHTML = '<div class="text-slate-400 text-center py-8">メッシュを選択してください</div>';
                return;
            }

            const currentDBStr = localStorage.getItem('sikaSurveyDB');
            const currentDB = currentDBStr ? JSON.parse(currentDBStr) : [];
            const filtered = currentDB.filter(s => {
                const checkProj = pSel ? (((s.projectName && s.projectName.trim() !== '') ? s.projectName : '業務設定なし') === pSel) : true;
                const checkMesh = ((s.meshNo && s.meshNo.trim() !== '') ? s.meshNo : '名称未設定') === mSel;
                return checkProj && checkMesh;
            });
            
            let c = {
                veg: {'A':0,'B':0,'C':0,'D':0,'E':0,'F':0,'G':0,'H':0,'I':0,'J':0,'K':0,'L':0},
                underGen: {'極多':0,'多い':0,'少ない':0,'なし':0},
                underSasa: {'多い':0,'少ない':0,'なし':0},
                sika: { sight: 0, foot: 0, vocal: 0 },
                dungO: { new: 0, med: 0, old: 0 },
                dungU: { new: 0, med: 0, old: 0 }
            };

            let totalCards = 0;

            filtered.forEach(survey => {
                survey.areaData.forEach(area => {
                    totalCards++;
                    const vegArr = area["植生タイプ"].split(', ').filter(v => v);
                    vegArr.forEach(v => { if (c.veg[v] !== undefined) c.veg[v]++; });
                    if (c.underGen[area["下層植生(一般)"]] !== undefined) c.underGen[area["下層植生(一般)"]]++;
                    if (c.underSasa[area["下層植生(ササ)"]] !== undefined) c.underSasa[area["下層植生(ササ)"]]++;
                    c.sika.sight += parseInt(area["生体:目撃"]) || 0;
                    c.sika.foot += parseInt(area["生体:足跡"]) || 0;
                    c.sika.vocal += parseInt(area["生体:鳴声"]) || 0;
                    c.dungO.new += parseInt(area["糞塊10+:新"]) || 0;
                    c.dungO.med += parseInt(area["糞塊10+:中"]) || 0;
                    c.dungO.old += parseInt(area["糞塊10+:旧"]) || 0;
                    c.dungU.new += parseInt(area["糞塊10-:新"]) || 0;
                    c.dungU.med += parseInt(area["糞塊10-:中"]) || 0;
                    c.dungU.old += parseInt(area["糞塊10-:旧"]) || 0;
                });
            });

            analysisContent.innerHTML = `
                <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mb-6">
                    <div class="text-emerald-800 font-bold mb-1">サマリー</div>
                    <div class="text-sm text-emerald-600 mb-1">業務: ${pSel || '未指定'} / メッシュ: ${mSel}</div>
                    <div class="text-xs text-emerald-600/80">合致する調査データ: ${filtered.length}件 / 合計区域数: ${totalCards}区画</div>
                </div>

                <h3 class="font-bold border-l-4 border-slate-400 pl-2 text-slate-700 mb-2">植生タイプ出現数</h3>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 text-sm text-center mb-6">
                    ${Object.entries(c.veg).map(([k,v]) => `<div class="bg-white py-2 rounded shadow-sm border border-slate-100"><span class="font-bold text-slate-500">${k}</span><br><span class="text-lg font-bold text-slate-800">${v}</span></div>`).join('')}
                </div>

                <h3 class="font-bold border-l-4 border-slate-400 pl-2 text-slate-700 mb-2">下層植生カウント</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-sm">
                        <div class="font-bold text-slate-500 mb-2 border-b border-slate-100 pb-1">一般</div>
                        <div class="flex justify-between py-1"><span>極多</span><span class="font-bold">${c.underGen['極多']}</span></div>
                        <div class="flex justify-between py-1 border-t border-slate-50"><span>多い</span><span class="font-bold">${c.underGen['多い']}</span></div>
                        <div class="flex justify-between py-1 border-t border-slate-50"><span>少ない</span><span class="font-bold">${c.underGen['少ない']}</span></div>
                        <div class="flex justify-between py-1 border-t border-slate-50 text-slate-400"><span>なし</span><span class="font-bold">${c.underGen['なし']}</span></div>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-sm">
                        <div class="font-bold text-slate-500 mb-2 border-b border-slate-100 pb-1">ササ</div>
                        <div class="flex justify-between py-1 border-t border-slate-50"><span>多い</span><span class="font-bold">${c.underSasa['多い']}</span></div>
                        <div class="flex justify-between py-1 border-t border-slate-50"><span>少ない</span><span class="font-bold">${c.underSasa['少ない']}</span></div>
                        <div class="flex justify-between py-1 border-t border-slate-50 text-slate-400"><span>なし</span><span class="font-bold">${c.underSasa['なし']}</span></div>
                    </div>
                </div>

                <h3 class="font-bold border-l-4 border-emerald-500 pl-2 text-slate-700 mb-2">シカ生体 (カウント)</h3>
                <div class="overflow-x-auto bg-white shadow-sm border border-slate-200 rounded-lg mb-6">
                    <table class="w-full text-sm text-left whitespace-nowrap">
                        <thead class="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                            <tr><th class="px-4 py-3">項目</th><th class="px-4 py-3 text-right">目撃</th><th class="px-4 py-3 text-right">足跡</th><th class="px-4 py-3 text-right">鳴声</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <tr><td class="px-4 py-3 font-bold text-emerald-700">シカ生体</td><td class="px-4 py-3 text-right font-bold">${c.sika.sight}</td><td class="px-4 py-3 text-right font-bold">${c.sika.foot}</td><td class="px-4 py-3 text-right font-bold">${c.sika.vocal}</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 class="font-bold border-l-4 border-orange-400 pl-2 text-slate-700 mb-2">シカ糞塊 (カウント)</h3>
                <div class="overflow-x-auto bg-white shadow-sm border border-slate-200 rounded-lg">
                    <table class="w-full text-sm text-left whitespace-nowrap">
                        <thead class="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                            <tr><th class="px-4 py-3">項目</th><th class="px-4 py-3 text-right">新</th><th class="px-4 py-3 text-right">中</th><th class="px-4 py-3 text-right">旧</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <tr><td class="px-4 py-3 font-bold text-orange-600">糞塊 (10粒以上)</td><td class="px-4 py-3 text-right font-bold">${c.dungO.new}</td><td class="px-4 py-3 text-right font-bold">${c.dungO.med}</td><td class="px-4 py-3 text-right font-bold">${c.dungO.old}</td></tr>
                            <tr><td class="px-4 py-3 font-bold text-amber-500">糞塊 (10粒未満)</td><td class="px-4 py-3 text-right font-bold">${c.dungU.new}</td><td class="px-4 py-3 text-right font-bold">${c.dungU.med}</td><td class="px-4 py-3 text-right font-bold">${c.dungU.old}</td></tr>
                        </tbody>
                    </table>
                </div>
            `;
        });

        // -------------------------
        // Log Management Handlers
        // -------------------------
        const manageLogsBtn = document.getElementById('btn-manage-logs');
        const logManageModal = document.getElementById('log-manage-modal');
        const closeLogManageBtn = document.getElementById('btn-close-log-manage');
        const logListContainer = document.getElementById('log-list-container');
        const btnDeleteLogs = document.getElementById('btn-delete-logs');
        const cbSelectAll = document.getElementById('log-select-all');
        const logCountDisplay = document.getElementById('log-count-display');
        const logFilterProject = document.getElementById('log-manage-project-filter');

        const updateDeleteBtnState = () => {
            if (!btnDeleteLogs) return;
            const checkeds = document.querySelectorAll('.log-cb:checked');
            btnDeleteLogs.disabled = checkeds.length === 0;
            if (cbSelectAll) {
                const total = document.querySelectorAll('.log-cb').length;
                cbSelectAll.checked = (total > 0 && checkeds.length === total);
            }
        };

        const refreshLogList = () => {
            const currentDBStr = localStorage.getItem('sikaSurveyDB');
            const currentDB = currentDBStr ? JSON.parse(currentDBStr) : [];
            const filterVal = logFilterProject ? logFilterProject.value : '';

            if (logFilterProject && (logFilterProject.options.length <= 1 || logFilterProject.getAttribute('data-loaded') !== 'true')) {
                const uniqueP = [...new Set(currentDB.map(s => (s.projectName && s.projectName.trim() !== '') ? s.projectName : '業務設定なし'))];
                logFilterProject.innerHTML = `<option value="">すべての業務を表示</option>` + uniqueP.map(p => `<option value="${p}">${p}</option>`).join('');
                logFilterProject.value = filterVal;
                logFilterProject.setAttribute('data-loaded', 'true');
            }

            let filteredDB = currentDB;
            if (filterVal) {
                filteredDB = currentDB.filter(s => ((s.projectName && s.projectName.trim() !== '') ? s.projectName : '業務設定なし') === filterVal);
            }

            if(logCountDisplay) logCountDisplay.textContent = filteredDB.length;
            if(cbSelectAll) cbSelectAll.checked = false;
            
            if (filteredDB.length === 0) {
                if(logListContainer) logListContainer.innerHTML = '<div class="text-slate-400 text-center py-8">該当するログはありません</div>';
                if(btnDeleteLogs) btnDeleteLogs.disabled = true;
                return;
            }

            // Sort by savedAt descending
            const sortedDB = [...filteredDB].sort((a,b) => new Date(b.savedAt) - new Date(a.savedAt));

            if(logListContainer) {
                logListContainer.innerHTML = sortedDB.map(l => {
                    const pName = l.projectName || '業務名未設定';
                    const mNo = l.meshNo || 'メッシュ未設定';
                    const d = new Date(l.savedAt);
                    const textDate = l.dateVal || '日付未設定';
                    const saveTime = d.toLocaleString('ja-JP');
                    return `
                        <label class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-emerald-300 transition-colors">
                            <input type="checkbox" value="${l.savedAt}" class="log-cb w-5 h-5 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500">
                            <div class="flex-1">
                                <div class="text-sm font-bold text-slate-800">${pName} <span class="text-slate-400 font-normal ml-2 text-[10px]">${textDate}</span></div>
                                <div class="text-[11px] text-slate-500 mt-1">メッシュ:<span class="font-bold text-emerald-600">${mNo}</span> / 区画:${l.areaData.length} / 保存:${saveTime}</div>
                            </div>
                        </label>
                    `;
                }).join('');
            }
            
            updateDeleteBtnState();
            
            document.querySelectorAll('.log-cb').forEach(cb => {
                cb.addEventListener('change', updateDeleteBtnState);
            });
        };

        logFilterProject?.addEventListener('change', refreshLogList);

        cbSelectAll?.addEventListener('change', (e) => {
            document.querySelectorAll('.log-cb').forEach(cb => cb.checked = e.target.checked);
            updateDeleteBtnState();
        });

        manageLogsBtn?.addEventListener('click', () => {
            logManageModal?.classList.remove('hidden');
            refreshLogList();
        });

        closeLogManageBtn?.addEventListener('click', () => {
            logManageModal?.classList.add('hidden');
            const afterDBStr = localStorage.getItem('sikaSurveyDB');
            if (afterDBStr === '[]' || !afterDBStr) {
                if (analyzeBtn) analyzeBtn.classList.add('hidden');
                if (manageLogsBtn) manageLogsBtn.classList.add('hidden');
            }
        });

        btnDeleteLogs?.addEventListener('click', () => {
            const checkeds = document.querySelectorAll('.log-cb:checked');
            if (checkeds.length === 0) return;
            if (!confirm(`選択した ${checkeds.length} 件の調査データを完全に消去しますか？\n（この操作は元に戻せません）`)) return;

            const toDelete = Array.from(checkeds).map(cb => cb.value);
            const currentDBStr = localStorage.getItem('sikaSurveyDB');
            const currentDB = currentDBStr ? JSON.parse(currentDBStr) : [];
            const newDB = currentDB.filter(item => !toDelete.includes(item.savedAt));
            localStorage.setItem('sikaSurveyDB', JSON.stringify(newDB));
            refreshLogList();
        });
    }
});

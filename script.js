document.addEventListener("DOMContentLoaded", () => {
  const dates = genDates('2025-06-12','2027-12-31');
  let idx = dates.indexOf(todayISO()) || 0;
  const tasks = JSON.parse(localStorage.getItem('tasks')||'{}');
  const el = {
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    title: document.getElementById('day-title'),
    list: document.getElementById('tasks'),
    add: document.getElementById('add-btn'),
    modal: document.getElementById('modal'),
    form: document.getElementById('form'),
    cancel: document.getElementById('cancel'),
    wrapper: document.getElementById('calendar-wrapper'),
    fields: ['client','car','time','price','place','desc','edit'].reduce((o,id)=> (o[id]=document.getElementById(id),o), {})
  };
  const inc = { total:0, month:0, today:0, elements: {
    total: document.getElementById('total-income'),
    month: document.getElementById('month-income'),
    today: document.getElementById('today-income')
  }};

  function todayISO(){ return new Date().toISOString().split('T')[0]; }

  el.prev.onclick = ()=>{ if(idx>0) idx--, draw(); };
  el.next.onclick = ()=>{ if(idx<dates.length-1) idx++, draw(); };
  el.add.onclick = ()=> openModal();
  el.cancel.onclick = ()=> el.modal.style.display='none';

  el.form.onsubmit = e=>{
    e.preventDefault();
    const date = dates[idx];
    let day = tasks[date]||[];
    const o = el.fields;
    const obj = {
      client:o.client.value,car:o.car.value,time:o.time.value,
      price:o.price.value,place:o.place.value,desc:o.desc.value,
      done:false
    };
    if(o.edit.value!==''){
      day[+o.edit.value] = {...day[+o.edit.value], ...obj};
    } else day.push(obj);
    tasks[date]=day;
    save();
    el.modal.style.display='none';
    draw();
  };

  el.list.onclick = e=>{
    const t = e.target;
    if(t.dataset.i != null){
      const i = +t.dataset.i;
      const day = tasks[dates[idx]];
      if(t.classList.contains('toggle')) {
        day[i].done = !day[i].done;
      } else if(t.classList.contains('del')){
        day.splice(i,1);
      } else if(t.classList.contains('edit')){
        openModal(i, day[i]);
        return;
      }
      save(); draw();
    }
  };

  function openModal(i,obj){
    el.modal.style.display='flex';
    const o=el.fields;
    if(i!=null){
      o.client.value=obj.client; o.car.value=obj.car; o.time.value=obj.time;
      o.price.value=obj.price; o.place.value=obj.place; o.desc.value=obj.desc;
      o.edit.value=i;
    } else o.edit.value='';
  }

  function draw(){
    const date = dates[idx];
    el.title.textContent = new Date(date).toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});
    el.list.innerHTML='';
    (tasks[date]||[]).forEach((t,i)=>{
      el.list.innerHTML += `
        <div class="task">
          <div><strong>${t.client}</strong> ${t.time} ${t.car} ${t.place} ${t.price} ₽ ${t.desc?'– '+t.desc:''}</div>
          <div class="actions">
            <button class="toggle" data-i="${i}">${t.done?'✅':'❌'}</button>
            <button class="edit" data-i="${i}">✏️</button>
            <button class="del" data-i="${i}">🗑️</button>
          </div>
        </div>`;
    });
    updateInc();
  }

  function updateInc(){
    let tot=0,mon=0,tod=0;
    const nowISO = todayISO(), m0 = nowISO.slice(0,7);
    for(const d in tasks){
      tasks[d].forEach(t=>{
        if(t.done){
          const p=+t.price||0; tot+=p;
          if(d===nowISO) tod+=p;
          if(d.slice(0,7)===m0) mon+=p;
        }
      });
    }
    inc.elements.total.textContent = tot + ' ₽';
    inc.elements.month.textContent = mon + ' ₽';
    inc.elements.today.textContent = tod + ' ₽';
  }

  function save(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function genDates(st,en){
    const a=[], d=new Date(st), D=new Date(en);
    while(d<=D){ a.push(d.toISOString().split('T')[0]); d.setDate(d.getDate()+1); }
    return a;
  }

  // 👇 свайп между датами
  let startX = 0;
  el.wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  el.wrapper.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if(Math.abs(dx) > 30){
      if(dx < 0 && idx < dates.length-1) idx++;
      else if(dx > 0 && idx > 0) idx--;
      draw();
    }
  });

  draw();
});

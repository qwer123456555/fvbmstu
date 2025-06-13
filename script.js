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
    fields: ['client','car','time','price','place','desc','edit'].reduce((o,id)=> (o[id]=document.getElementById(id),o), {})
  };
  const inc = { total:0, month:0, today:0, elements: {
    total: document.getElementById('total-income'),
    month: document.getElementById('month-income'),
    today: document.getElementById('today-income')
  }};

  function todayISO(){ return new Date().toISOString().split('T')[0]; }

  el.prev.onclick = ()=>{
    if(idx>0) idx--, draw();
  };
  el.next.onclick = ()=>{
    if(idx<dates.length-1) idx++, draw();
  };
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
    if(t.classList.contains('status')){
      const i = +t.dataset.i;
      const day = tasks[dates[idx]];
      day[i].done = !day[i].done;
      save(); draw();
    } else if(t.classList.contains('del')){
      const i = +t.dataset.i;
      tasks[dates[idx]].splice(i,1);
      save(); draw();
    } else if(t.classList.contains('edit')){
      const i = +t.dataset.i;
      openModal(i, tasks[dates[idx]][i]);
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
          <div class="status" data-i="${i}">${t.done?'✅':'❌'}</div>
          <div><strong>${t.client}</strong> ${t.time} ${t.car} ${t.place} ${t.price} ₽ ${t.desc?'– '+t.desc:''}</div>
          <div class="actions">
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

  draw();
});

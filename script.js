const frames = document.getElementById('frames');
const itemModal = document.getElementById('itemModal');
const nav = document.getElementById('nav');

let activeIndex = 0;

// 프레임 3개 기본 생성
for(let i=0;i<3;i++){
  const f=document.createElement('div');
  f.className='frame';
  f.innerHTML='<div class="items"></div>';
  frames.appendChild(f);
}
updateActive();

frames.addEventListener('scroll',()=>{
  const center = frames.scrollLeft / frames.clientWidth;
  activeIndex = Math.round(center);
  updateActive();
});

function updateActive(){
  document.querySelectorAll('.frame').forEach((f,i)=>{
    f.classList.toggle('active', i===activeIndex);
  });
}

// 아이템 모달
openItemModal.onclick=()=>itemModal.classList.remove('hidden');
closeItemModal.onclick=()=>itemModal.classList.add('hidden');

addItemBtn.onclick=()=>{
  const name=itemName.value;
  const file=itemImage.files[0];
  if(!name||!file)return;

  const url=URL.createObjectURL(file);
  const card=document.createElement('div');
  card.className='item-card';
  card.innerHTML=`<img src="${url}"><p>${name}</p>`;

  document.querySelectorAll('.frame')[activeIndex]
    .appendChild(card);

  itemModal.classList.add('hidden');
  itemName.value=itemPrice.value=itemMemo.value='';
  itemImage.value='';
};

// NAV
openNav.onclick=()=>nav.classList.add('show');
closeNav.onclick=()=>nav.classList.remove('show');

document.addEventListener("DOMContentLoaded", function(){

  if(document.getElementById("richard-client")) return;

  let root=document.createElement("div");
  root.id="richard-client";
  root.style.cssText=`
    position:fixed;
    top:120px;
    left:120px;
    width:320px;
    height:420px;
    background:#1a0000;
    border:2px solid #ff3b3b;
    border-radius:10px;
    z-index:999999999;
    font-family:sans-serif;
    display:flex;
    flex-direction:column;
    color:white;
  `;

  root.innerHTML=`
    <div id="rc-header" style="padding:10px;background:#ff3b3b;font-weight:bold;cursor:grab;">
      Richard Client
    </div>

    <div style="display:flex;background:#330000;">
      <button class="rc-tab" data-tab="general" style="flex:1;color:white;background:#330000;border:none;padding:8px;">General</button>
      <button class="rc-tab" data-tab="visual" style="flex:1;color:white;background:#330000;border:none;padding:8px;">Visual</button>
      <button class="rc-tab" data-tab="dev" style="flex:1;color:white;background:#330000;border:none;padding:8px;">Dev</button>
    </div>

    <div id="rc-content" style="padding:10px;overflow:auto;flex:1;color:white;">
      Select a tab.
    </div>
  `;

  document.body.appendChild(root);

  function loadTab(name){
    let c=document.getElementById("rc-content");

    if(name==="general"){
      c.innerHTML=`
        <div style="margin-bottom:10px;">General Controls</div>
        <button onclick="location.reload()" style="margin-bottom:5px;color:white;background:#550000;border:1px solid #ff3b3b;padding:6px;border-radius:5px;">Reload Page</button><br>
        <button onclick="alert('Hook this to your clone')" style="margin-bottom:5px;color:white;background:#550000;border:1px solid #ff3b3b;padding:6px;border-radius:5px;">Log Game State</button>
      `;
    }

    if(name==="visual"){
      c.innerHTML=`
        <div style="margin-bottom:10px;">Visual Tweaks</div>
        <button onclick="document.body.style.filter='brightness(0.8)'" style="margin-bottom:5px;color:white;background:#550000;border:1px solid #ff3b3b;padding:6px;border-radius:5px;">Darken</button><br>
        <button onclick="document.body.style.filter=''" style="margin-bottom:5px;color:white;background:#550000;border:1px solid #ff3b3b;padding:6px;border-radius:5px;">Reset</button>
      `;
    }

    if(name==="dev"){
      c.innerHTML=`
        <div style="margin-bottom:10px;">Developer Tools</div>
        <button onclick="alert('Open DevTools manually')" style="margin-bottom:5px;color:white;background:#550000;border:1px solid #ff3b3b;padding:6px;border-radius:5px;">Open Console</button><br>
        <button onclick="let code=prompt('Enter JS:'); if(code) eval(code);" style="margin-bottom:5px;color:white;background:#550000;border:1px solid #ff3b3b;padding:6px;border-radius:5px;">Run Custom Code</button>
      `;
    }
  }

  document.querySelectorAll(".rc-tab").forEach(btn=>{
    btn.onclick=()=>loadTab(btn.dataset.tab);
  });

  // DRAGGING
  let header=document.getElementById("rc-header");
  let dragging=false, offsetX=0, offsetY=0;

  header.addEventListener("pointerdown", e=>{
    dragging=true;
    header.setPointerCapture(e.pointerId);
    let rect=root.getBoundingClientRect();
    offsetX=e.clientX-rect.left;
    offsetY=e.clientY-rect.top;
  });

  header.addEventListener("pointermove", e=>{
    if(!dragging) return;
    root.style.left=(e.clientX-offsetX)+"px";
    root.style.top=(e.clientY-offsetY)+"px";
  });

  header.addEventListener("pointerup", e=>{
    dragging=false;
    header.releasePointerCapture(e.pointerId);
  });

});

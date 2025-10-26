/* Client-side fake data and helpers to provide a smooth demo experience
   without a backend. This populates common elements if present on the page.
*/
(function(){
  const sample = {
    stats: { totalDocuments: 42, activeShares: 5, storageUsed: '1.2 GB / 5 GB' },
    recentActivity: [
      {action:'Upload', file:'Tax_Docs_2024.pdf', desc:'New file uploaded.', time:'5 mins ago'},
      {action:'Share', file:'Project_Plan.docx', desc:'Shared with Harish.', time:'2 hours ago'},
      {action:'View', file:'Resume.pdf', desc:'Srushti viewed the file.', time:'Yesterday'}
    ],
    documents: [
      {name:'Resume_encrypted.pdf', size:'2.1 MB', status:'Encrypted', date:'2024-10-25'},
      {name:'Bank_Statement_Q3.docx', size:'800 KB', status:'Encrypted', date:'2024-09-01'},
      {name:'Tax_Docs_2024.pdf', size:'1.4 MB', status:'Encrypted', date:'2024-10-20'}
    ],
    notifications: [
      {text:'Srushti viewed Resume.pdf', time:'1h ago'},
      {text:'Project_Plan.docx was shared with Anjali', time:'3h ago'},
      {text:'Your storage is 24% full', time:'1d ago'}
    ],
    logs: [
      {event:'Upload', user:'You', target:'Tax_Docs_2024.pdf', time:'2024-10-25 12:34'},
      {event:'Share', user:'You', target:'Project_Plan.docx', time:'2024-10-24 09:12'}
    ]
  };

  function qs(id){ return document.getElementById(id); }

  function populateDashboard(){
    if (qs('total-documents')) qs('total-documents').textContent = sample.stats.totalDocuments;
    if (qs('active-shares')) qs('active-shares').textContent = sample.stats.activeShares;
    if (qs('storage-used')) qs('storage-used').textContent = sample.stats.storageUsed;

    const recentTable = document.getElementById('recent-activity-table');
    if (recentTable){
      const tbody = recentTable.querySelector('tbody') || recentTable.appendChild(document.createElement('tbody'));
      tbody.innerHTML = sample.recentActivity.map(r=>
        `<tr class="table-row-item">
          <td class="table-cell-padding action-cell">${r.action}</td>
          <td class="table-cell-padding">${r.file}</td>
          <td class="table-cell-padding table-cell-desktop-only text-slate-400">${r.desc}</td>
          <td class="table-cell-padding table-timestamp">${r.time}</td>
        </tr>`
      ).join('\n');
    }
  }

  function populateDocuments(){
    const body = qs('document-table-body');
    if (body){
      body.innerHTML = sample.documents.map(d=>
        `<tr class="document-row table-row-item">
           <td class="table-cell-padding document-name-cell">${d.name}</td>
           <td class="table-cell-padding table-cell-desktop-small table-timestamp">${d.size}</td>
           <td class="table-cell-padding table-cell-desktop-medium"><span class="status-badge status-encrypted">${d.status}</span></td>
           <td class="table-cell-padding table-timestamp">${d.date}</td>
           <td class="table-cell-padding text-center">
             <button class="action-btn action-view">View</button>
             <button class="action-btn action-share" onclick="window.location.href='share.html'">Share</button>
             <button class="action-btn action-delete">Delete</button>
           </td>
         </tr>`
      ).join('\n');
      const count = qs('document-count'); if (count) count.textContent = sample.documents.length;
    }
  }

  function populateNotifications(){
    const badge = qs('notification-count'); if (badge) badge.textContent = sample.notifications.length;
    const list = document.querySelector('.notifications-list');
    if (list){
      list.innerHTML = sample.notifications.map(n=>`<div class="notification-item"><p>${n.text}</p><span class="time">${n.time}</span></div>`).join('\n');
    }
  }

  function populateLogs(){
    const table = document.getElementById('logs-table');
    if (table){
      const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));
      tbody.innerHTML = sample.logs.map(l=>
        `<tr><td>${l.event}</td><td>${l.user}</td><td>${l.target}</td><td>${l.time}</td></tr>`
      ).join('\n');
    }
  }

  function enableDemoButtons(){
    // make any button with data-href navigate (uniform approach)
    document.querySelectorAll('button[data-href]').forEach(b=>{
      b.addEventListener('click', ()=>{ window.location.href = b.getAttribute('data-href'); });
    });

    // simulate delete/view/share actions with tiny UI feedback
    document.addEventListener('click', (e)=>{
      if (e.target.matches('.action-delete')){
        const row = e.target.closest('tr'); if (row) row.remove();
      }
      if (e.target.matches('.action-view')){
        alert('Viewing file (demo)');
      }
      if (e.target.matches('.action-share')){
        // if current page is not share, navigate to share
        if (!location.pathname.endsWith('/share.html')) window.location.href = 'share.html';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    try{ populateDashboard(); }catch(e){}
    try{ populateDocuments(); }catch(e){}
    try{ populateNotifications(); }catch(e){}
    try{ populateLogs(); }catch(e){}
    try{ enableDemoButtons(); }catch(e){}
  });
})();

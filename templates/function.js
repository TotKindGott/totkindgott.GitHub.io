function functionName() {
    let start = performance.now();
    LOG(">>> functionName() <span class='tag path'>path.js</span>");
    
    let end = performance.now();
    NOTE(`functionName() executed in <span class="tag time">${Number((end - start)/1000).toFixed(2)}s</span>`);
    SUCCESS("functionName() run status: OK");
}; // functionName() ends

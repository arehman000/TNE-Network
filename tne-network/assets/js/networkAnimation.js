document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("networkCanvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    // Auto-resize
    let width, height;
    let centerX, centerY;
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        centerX = width / 2;
        centerY = height / 2;
    }
    window.addEventListener("resize", resize);
    resize();

    // Configuration
    const NODE_COUNT = 75;
    const CONNECT_DISTANCE = 180;
    const BASE_SPEED = 0.15;
    
    // Clearer base tones: Navy, Indigo, Muted Violet
    const COLORS = [
        "rgba(30, 58, 138, 0.4)",  // Navy
        "rgba(67, 56, 202, 0.35)", // Indigo
        "rgba(109, 40, 217, 0.25)" // Violet
    ];
    
    // Interaction Tracking
    let mouseX = centerX;
    let mouseY = centerY;
    let targetMouseX = centerX;
    let targetMouseY = centerY;
    
    const wrapper = canvas.parentElement;
    wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        targetMouseX = e.clientX - rect.left;
        targetMouseY = e.clientY - rect.top;
    });
    
    wrapper.addEventListener("mouseleave", () => {
        // Gently return to center when mouse leaves
        targetMouseX = centerX;
        targetMouseY = centerY;
    });

    class Node {
        constructor() {
            this.baseX = Math.random() * width;
            this.baseY = Math.random() * height;
            this.vx = (Math.random() - 0.5) * BASE_SPEED;
            this.vy = (Math.random() - 0.5) * BASE_SPEED;
            this.radius = Math.random() * 2 + 1.5;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            
            // Depth for parallax effect (0.1 to 1.0)
            this.z = Math.random() * 0.9 + 0.1; 
        }
        
        update() {
            this.baseX += this.vx;
            this.baseY += this.vy;
            
            // Continuous flowing movement around borders
            if (this.baseX < -50) this.baseX = width + 50;
            if (this.baseX > width + 50) this.baseX = -50;
            if (this.baseY < -50) this.baseY = height + 50;
            if (this.baseY > height + 50) this.baseY = -50;
        }
        
        get RenderX() {
            // Calculate parallax shift based on mouse deviation from center, scaled by node depth
            const shiftX = (mouseX - centerX) * this.z * 0.05;
            return this.baseX - shiftX;
        }
        
        get RenderY() {
            const shiftY = (mouseY - centerY) * this.z * 0.05;
            return this.baseY - shiftY;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.RenderX, this.RenderY, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    const nodes = Array.from({ length: NODE_COUNT }, () => new Node());
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Smoothly interpolate mouse coordinates for fluid, executive-level motion
        mouseX += (targetMouseX - mouseX) * 0.03;
        mouseY += (targetMouseY - mouseY) * 0.03;
        
        // Update & Draw nodes
        nodes.forEach(node => node.update());
        
        // Draw elegant connections using Render coordinates
        for (let i = 0; i < nodes.length; i++) {
            const n1 = nodes[i];
            const x1 = n1.RenderX;
            const y1 = n1.RenderY;
            
            for (let j = i + 1; j < nodes.length; j++) {
                const n2 = nodes[j];
                const x2 = n2.RenderX;
                const y2 = n2.RenderY;
                
                const dx = x1 - x2;
                const dy = y1 - y2;
                const distSquared = dx * dx + dy * dy;
                
                if (distSquared < CONNECT_DISTANCE * CONNECT_DISTANCE) {
                    const dist = Math.sqrt(distSquared);
                    ctx.beginPath();
                    // Fade line based on distance
                    const opacity = 1 - (dist / CONNECT_DISTANCE);
                    
                    // Lines are slightly thicker and more visible, matching Navy/Violet tone
                    ctx.strokeStyle = `rgba(45, 60, 150, ${opacity * 0.25})`; 
                    ctx.lineWidth = 1.0;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        }
        
        nodes.forEach(node => node.draw());
        
        requestAnimationFrame(animate);
    }
    
    animate();
});

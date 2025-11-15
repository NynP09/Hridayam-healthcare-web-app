import React, { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

const LiveECGGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationId: number;
    let x = 0;
    const points: number[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Grid
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.offsetWidth; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.offsetHeight);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.offsetHeight; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.offsetWidth, i);
        ctx.stroke();
      }

      // ECG Line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = canvas.offsetHeight / 2;
      const amplitude = 60;

      for (let i = 1; i < points.length; i++) {
        const x1 = (i - 1) * 2;
        const x2 = i * 2;
        const y1 = centerY - points[i - 1] * amplitude;
        const y2 = centerY - points[i] * amplitude;

        if (i === 1) ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      // Generate ECG-like waveform
      const time = x * 0.02;
      let ecgValue = 0;

      // P wave, QRS complex, T wave simulation
      const heartbeatCycle = time % 2;
      if (heartbeatCycle < 0.1) {
        ecgValue = 0.3 * Math.sin(heartbeatCycle * 31.4);
      } else if (heartbeatCycle < 0.3) {
        const qrsTime = (heartbeatCycle - 0.1) / 0.2;
        if (qrsTime < 0.3) ecgValue = -0.2 * Math.sin(qrsTime * 10.47);
        else if (qrsTime < 0.7) ecgValue = 1.5 * Math.sin((qrsTime - 0.3) * 7.85);
        else ecgValue = -0.4 * Math.sin((qrsTime - 0.7) * 10.47);
      } else if (heartbeatCycle < 0.6) {
        ecgValue = 0.4 * Math.sin((heartbeatCycle - 0.3) * 10.47);
      } else {
        ecgValue = 0.02 * (Math.random() - 0.5);
      }

      points.push(ecgValue);
      if (points.length > canvas.offsetWidth / 2) {
        points.shift();
      }

      x++;
      if (isRecording) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRecording]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-teal-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Live ECG Monitor</h3>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center ${isRecording ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-3 h-3 rounded-full mr-2 ${isRecording ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm font-medium">{isRecording ? 'Recording' : 'Stopped'}</span>
          </div>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isRecording 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isRecording ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-64 border border-gray-200 rounded-md bg-gray-50"
          style={{ height: '256px' }}
        />
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          Lead II
        </div>
      </div>
    </div>
  );
};

export default LiveECGGraph;
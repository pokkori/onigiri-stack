"use client";
import {useRef,useEffect,useCallback} from "react";
import {usePhysicsGame,CANVAS_W,CANVAS_H} from "@/hooks/usePhysicsGame";
import {ITEMS} from "@/lib/items";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {score,bestScore,gameState,nextItem,currentItem,dropX,canDrop,initGame,dropBall,updateDropX,restart} = usePhysicsGame(canvasRef);
  useEffect(() => { initGame(); }, [initGame]);
  const gx = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) return e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0;
    return e.clientX;
  };
  const hm = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (gameState==="gameover") return;
    const r=(e.currentTarget as HTMLElement).getBoundingClientRect();
    updateDropX(Math.max(0,Math.min(CANVAS_W,(gx(e)-r.left)*(CANVAS_W/r.width))));
  },[gameState,updateDropX]);
  const ht = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (gameState==="gameover") return;
    const r=(e.currentTarget as HTMLElement).getBoundingClientRect();
    updateDropX(Math.max(0,Math.min(CANVAS_W,(gx(e)-r.left)*(CANVAS_W/r.width))));
    dropBall();
  },[gameState,updateDropX,dropBall]);
  const st=encodeURIComponent("おにぎりスタックで"+score+"点！🍙 #おにぎりスタック");
  const su=encodeURIComponent("https://onigiri-stack.vercel.app/game");
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-950 select-none">
      <div className="w-full max-w-sm px-3 py-2 flex items-center justify-between">
        <div className="text-center"><div className="text-xs text-gray-400">スコア</div><div className="text-2xl font-bold text-amber-400">{score}</div></div>
        <div className="text-xl font-bold text-white">🍙 おにぎりスタック</div>
        <div className="text-center"><div className="text-xs text-gray-400">ベスト</div><div className="text-2xl font-bold text-green-400">{bestScore}</div></div>
      </div>
      <div className="flex items-center gap-3 mb-1 px-3">
        <div className="text-xs text-gray-400">NEXT</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor:nextItem.color+"33",border:"2px solid "+nextItem.color,fontSize:24}}>{nextItem.emoji}</div>
        <div className="text-xs text-gray-300">{nextItem.name}</div>
        {gameState==="danger" && <div className="text-red-400 text-xs font-bold animate-pulse ml-2">危険！</div>}
      </div>
      <div className="relative cursor-crosshair" style={{width:"100%",maxWidth:CANVAS_W,touchAction:"none"}} onMouseMove={hm} onMouseDown={ht} onTouchMove={hm} onTouchEnd={ht}>
        {gameState!=="gameover" && (
          <div className="absolute pointer-events-none z-10 flex items-center justify-center" style={{left:(dropX/CANVAS_W*100)+"%",top:8,transform:"translateX(-50%)",fontSize:Math.max(16,currentItem.radius*1.1),opacity:canDrop?1:0.4}}>
            {currentItem.emoji}
          </div>
        )}
        <canvas ref={canvasRef} style={{width:"100%",height:"auto",display:"block",border:"3px solid #c4a882",borderRadius:8,boxShadow:gameState==="danger"?"0 0 20px rgba(239,68,68,0.5)":"0 4px 20px rgba(0,0,0,0.5)"}} />
      </div>
      <div className="w-full max-w-sm mt-2 px-3 pb-4">
        <div className="text-xs text-gray-500 mb-1">進化表</div>
        <div className="flex flex-wrap gap-1">
          {ITEMS.map(item => (
            <div key={item.level} className="flex flex-col items-center" style={{width:"calc(10% - 2px)"}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor:item.color+"33",border:"1.5px solid "+item.color,fontSize:Math.max(12,item.radius*0.6)}}>{item.emoji}</div>
              <div className="text-gray-500 mt-0.5" style={{fontSize:9}}>{item.score}pt</div>
            </div>
          ))}
        </div>
      </div>
      {gameState==="gameover" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm text-center border border-amber-500/30">
            <div className="text-5xl mb-2">🍙</div>
            <h2 className="text-2xl font-bold text-white mb-1">ゲームオーバー</h2>
            <p className="text-gray-400 text-sm mb-4">タワーが限界を超えました</p>
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <div className="text-gray-400 text-sm">スコア</div>
              <div className="text-4xl font-bold text-amber-400">{score}</div>
              {score>=bestScore&&score>0&&<div className="text-green-400 text-sm mt-1">新記録！</div>}
              <div className="text-gray-500 text-xs mt-1">ベスト: {bestScore}</div>
            </div>
            <button onClick={restart} className="w-full py-3 rounded-xl font-bold text-lg mb-3 text-black" style={{backgroundColor:"#f59e0b"}}>もう一度遊ぶ</button>
            <a href={"https://twitter.com/intent/tweet?text="+st+"&url="+su} target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-xl font-bold text-sm bg-blue-500 text-white">X でシェア</a>
          </div>
        </div>
      )}
    </div>
  );
}
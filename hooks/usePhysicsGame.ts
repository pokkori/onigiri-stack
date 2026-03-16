"use client";
import { useCallback, useRef, useState, useEffect } from "react";
import { ITEMS, getRandomDropItem, type Item } from "@/lib/items";

export const CANVAS_W = 360;
export const CANVAS_H = 600;
const WALL_T = 30;
const DROP_Y = 40;
const DANGER_Y = 80;
const MERGE_COOLDOWN = 200;

export type GameState = "waiting" | "playing" | "danger" | "gameover";

interface BallMeta {
  id: number;
  level: number;
  justDropped?: boolean;
}

let ballIdCounter = 0;

export function usePhysicsGame(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [nextItem, setNextItem] = useState<Item>(() => getRandomDropItem());
  const [currentItem, setCurrentItem] = useState<Item>(() => getRandomDropItem());
  const [dropX, setDropX] = useState(CANVAS_W / 2);
  const [canDrop, setCanDrop] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engineRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runnerRef = useRef<any>(null);
  const ballMetaRef = useRef<Map<number, BallMeta>>(new Map());
  const pendingMerges = useRef<Set<string>>(new Set());
  const gameOverRef = useRef(false);
  const scoreRef = useRef(0);
  const dropXRef = useRef(CANVAS_W / 2);

  useEffect(() => {
    const saved = localStorage.getItem("onigiri_best");
    if (saved) setBestScore(parseInt(saved, 10));
  }, []);

  const addScore = useCallback((pts: number) => {
    scoreRef.current += pts;
    setScore(scoreRef.current);
    const best = parseInt(localStorage.getItem("onigiri_best") || "0", 10);
    if (scoreRef.current > best) {
      localStorage.setItem("onigiri_best", String(scoreRef.current));
      setBestScore(scoreRef.current);
    }
  }, []);

  const initGame = useCallback(async () => {
    if (!canvasRef.current) return;
    const Matter = (await import("matter-js")).default;
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (renderRef.current) Matter.Render.stop(renderRef.current);
    if (engineRef.current) Matter.Engine.clear(engineRef.current);
    ballMetaRef.current.clear();
    pendingMerges.current.clear();
    gameOverRef.current = false;
    scoreRef.current = 0;
    setScore(0);
    setGameState("playing");
    setCanDrop(true);
    dropXRef.current = CANVAS_W / 2;
    setDropX(CANVAS_W / 2);
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 2.5 } });
    engineRef.current = engine;
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine,
      options: { width: CANVAS_W, height: CANVAS_H, wireframes: false, background: "#f8f5f0" },
    });
    renderRef.current = render;
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    const ground = Matter.Bodies.rectangle(CANVAS_W/2,CANVAS_H+WALL_T/2,CANVAS_W,WALL_T,{isStatic:true,label:"ground",render:{fillStyle:"#c4a882"}});
    const wallL = Matter.Bodies.rectangle(-WALL_T/2,CANVAS_H/2,WALL_T,CANVAS_H*2,{isStatic:true,label:"wall",render:{fillStyle:"#c4a882"}});
    const wallR = Matter.Bodies.rectangle(CANVAS_W+WALL_T/2,CANVAS_H/2,WALL_T,CANVAS_H*2,{isStatic:true,label:"wall",render:{fillStyle:"#c4a882"}});
    Matter.World.add(engine.world, [ground, wallL, wallR]);
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const dX = dropXRef.current;
      ctx.save();ctx.setLineDash([6,5]);ctx.strokeStyle="rgba(245,158,11,0.6)";ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(dX,DROP_Y+15);ctx.lineTo(dX,CANVAS_H-WALL_T);ctx.stroke();ctx.restore();
      ctx.save();ctx.setLineDash([4,4]);ctx.strokeStyle="rgba(239,68,68,0.55)";ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,DANGER_Y);ctx.lineTo(CANVAS_W,DANGER_Y);ctx.stroke();ctx.restore();
      const bodies = Matter.Composite.allBodies(engine.world);
      for (const body of bodies) {
        const meta = ballMetaRef.current.get(body.id);
        if (!meta) continue;
        const item = ITEMS[meta.level - 1];
        if (!item) continue;
        const fontSize = Math.max(14, item.radius * 1.15);
        ctx.save();ctx.font=fontSize+"px serif";ctx.textAlign="center";ctx.textBaseline="middle";
        ctx.fillText(item.emoji, body.position.x, body.position.y);ctx.restore();
      }
    });
    Matter.Events.on(engine, "collisionStart", (event) => {
      if (gameOverRef.current) return;
      for (const pair of event.pairs) {
        const { bodyA, bodyB } = pair;
        const metaA = ballMetaRef.current.get(bodyA.id);
        const metaB = ballMetaRef.current.get(bodyB.id);
        if (!metaA || !metaB) continue;
        if (metaA.level !== metaB.level) continue;
        if (metaA.level >= ITEMS.length) continue;
        const key = [bodyA.id, bodyB.id].sort().join("-");
        if (pendingMerges.current.has(key)) continue;
        pendingMerges.current.add(key);
        const midX = (bodyA.position.x + bodyB.position.x) / 2;
        const midY = (bodyA.position.y + bodyB.position.y) / 2;
        const newLevel = metaA.level + 1;
        setTimeout(() => {
          pendingMerges.current.delete(key);
          if (gameOverRef.current) return;
          if (!ballMetaRef.current.has(bodyA.id) || !ballMetaRef.current.has(bodyB.id)) return;
          Matter.World.remove(engine.world, bodyA);
          Matter.World.remove(engine.world, bodyB);
          ballMetaRef.current.delete(bodyA.id);
          ballMetaRef.current.delete(bodyB.id);
          const newItem = ITEMS[newLevel - 1];
          const clampX = Math.max(newItem.radius+2, Math.min(CANVAS_W-newItem.radius-2, midX));
          const newBall = Matter.Bodies.circle(clampX,Math.max(newItem.radius,midY),newItem.radius,{
            restitution:0.25,friction:0.6,frictionAir:0.01,
            label:"ball_"+newLevel,render:{fillStyle:newItem.color+"bb"},
          });
          ballIdCounter++;
          ballMetaRef.current.set(newBall.id,{id:ballIdCounter,level:newLevel});
          Matter.World.add(engine.world, newBall);
          addScore(newItem.score);
        }, MERGE_COOLDOWN);
      }
    });
    let dangerStart=0, isDanger=false;
    Matter.Events.on(engine, "afterUpdate", () => {
      if (gameOverRef.current) return;
      const bodies = Matter.Composite.allBodies(engine.world);
      let hasHighBall = false;
      for (const body of bodies) {
        const meta = ballMetaRef.current.get(body.id);
        if (!meta || meta.justDropped) continue;
        const item = ITEMS[meta.level - 1];
        if (!item) continue;
        if (body.position.y - item.radius < DANGER_Y) { hasHighBall=true; break; }
      }
      if (hasHighBall) {
        if (!isDanger) { isDanger=true; dangerStart=Date.now(); setGameState("danger"); }
        else if (Date.now()-dangerStart>2500) { gameOverRef.current=true; setGameState("gameover"); Matter.Runner.stop(runner); }
      } else { if (isDanger) { isDanger=false; setGameState("playing"); } }
    });
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);
  }, [canvasRef, addScore]);

  const dropBall = useCallback(async () => {
    if (!canDrop || gameOverRef.current || !engineRef.current) return;
    const Matter = (await import("matter-js")).default;
    const item = currentItem;
    const x = Math.max(item.radius+2, Math.min(CANVAS_W-item.radius-2, dropXRef.current));
    const ball = Matter.Bodies.circle(x, DROP_Y, item.radius, {
      restitution:0.25, friction:0.6, frictionAir:0.01,
      label:"ball_"+item.level, render:{fillStyle:item.color+"bb"},
    });
    ballIdCounter++;
    const meta: BallMeta = {id:ballIdCounter,level:item.level,justDropped:true};
    ballMetaRef.current.set(ball.id, meta);
    Matter.World.add(engineRef.current.world, ball);
    setTimeout(() => { const m=ballMetaRef.current.get(ball.id); if(m) m.justDropped=false; }, 600);
    setCanDrop(false);
    setCurrentItem(nextItem);
    setNextItem(getRandomDropItem());
    setTimeout(() => { if(!gameOverRef.current) setCanDrop(true); }, 500);
  }, [canDrop, currentItem, nextItem]);

  const updateDropX = useCallback((x: number) => { dropXRef.current=x; setDropX(x); }, []);

  const restart = useCallback(() => {
    initGame();
    setCurrentItem(getRandomDropItem());
    setNextItem(getRandomDropItem());
  }, [initGame]);

  return { score,bestScore,gameState,nextItem,currentItem,dropX,canDrop,initGame,dropBall,updateDropX,restart };
}

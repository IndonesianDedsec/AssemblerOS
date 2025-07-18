import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Cpu, HardDrive, MemoryStick, Server } from "lucide-react";

export function SystemStatus() {
  return (
    <Card className="h-full bg-card/80 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Server className="w-6 h-6 text-primary" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Kernel & Drivers
          </h3>
          <p className="text-muted-foreground">
            Status: <span className="text-green-400 font-medium">ONLINE</span>
          </p>
          <p className="text-muted-foreground">Version: 0.1-asm</p>
          <p className="text-muted-foreground">Interrupts: KBD, TMR</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <MemoryStick className="w-5 h-5" />
            Memory Management
          </h3>
          <p className="text-muted-foreground mb-1">Usage: 12.3 / 64.0 MB</p>
          <Progress value={19} className="h-2" />
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Task Scheduling
          </h3>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside">
            <li>kernel.sys</li>
            <li>cli.exe</li>
            <li>dev_driver.sys</li>
            <li>mem_manager.dll</li>
            <li>task_scheduler.exe</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

"use client"

import * as React from "react"
import { Copy, RefreshCw, Shield, Zap, Lock, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function PasswordGenerator() {
  const [password, setPassword] = React.useState("")
  const [length, setLength] = React.useState(16)
  const [includeUppercase, setIncludeUppercase] = React.useState(true)
  const [includeLowercase, setIncludeLowercase] = React.useState(true)
  const [includeNumbers, setIncludeNumbers] = React.useState(true)
  const [includeSymbols, setIncludeSymbols] = React.useState(true)
  const [showPassword, setShowPassword] = React.useState(true)
  const [strength, setStrength] = React.useState(0)

  const generatePassword = React.useCallback(() => {
    const charset = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    }

    let availableChars = ""
    if (includeUppercase) availableChars += charset.upper
    if (includeLowercase) availableChars += charset.lower
    if (includeNumbers) availableChars += charset.numbers
    if (includeSymbols) availableChars += charset.symbols

    if (availableChars === "") {
      setPassword("")
      return
    }

    let generatedPassword = ""
    for (let i = 0; i < length; i++) {
      generatedPassword += availableChars.charAt(Math.floor(Math.random() * availableChars.length))
    }
    setPassword(generatedPassword)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  React.useEffect(() => {
    generatePassword()
  }, [generatePassword])

  React.useEffect(() => {
    let score = 0
    if (password.length > 12) score += 25
    if (password.length > 16) score += 15
    if (/[A-Z]/.test(password)) score += 15
    if (/[0-9]/.test(password)) score += 15
    if (/[^A-Za-z0-9]/.test(password)) score += 30
    setStrength(Math.min(score, 100))
  }, [password])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    toast.success("Copied!", {
        description: "Password copied to clipboard.",
    })
  }

  const strengthColor = strength > 75 ? "bg-emerald-500" : strength > 50 ? "bg-yellow-500" : "bg-red-500"
  const strengthLabel = strength > 75 ? "Strong" : strength > 50 ? "Medium" : "Weak"

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/10 overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1 bg-primary/5 pb-8">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-background/80 font-mono text-xs py-1">
            v2.4 SECURE ENGINE
          </Badge>
          <Lock className="w-5 h-5 text-primary/40" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-balance">Advanced Vault</CardTitle>
        <CardDescription className="text-base">
          Generate enterprise-grade security keys with granular control.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Result Area */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary to-accent rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-background p-4 rounded-xl border-2 border-primary/20">
            <div className="flex-1 flex items-center justify-between px-2 overflow-hidden">
              <span
                className={cn(
                  "text-2xl font-mono tracking-wider truncate py-2",
                  !showPassword && "blur-md select-none",
                )}
              >
                {password || "••••••••••••••••"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" size="icon" className="h-12 w-12 rounded-lg" onClick={generatePassword}>
                <RefreshCw size={20} className="text-primary" />
              </Button>
              <Button
                className="flex-1 sm:flex-none h-12 px-6 gap-2 rounded-lg shadow-lg shadow-primary/20"
                onClick={copyToClipboard}
              >
                <Copy size={18} />
                <span>Copy</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Security Strength
            </Label>
            <span className={cn("text-xs font-bold uppercase", strengthColor.replace("bg-", "text-"))}>
              {strengthLabel}
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden flex gap-1">
            {[25, 50, 75, 100].map((step) => (
              <div
                key={step}
                className={cn(
                  "flex-1 h-full transition-all duration-500",
                  strength >= step ? strengthColor : "bg-muted",
                )}
              />
            ))}
          </div>
          <div className="flex gap-4 text-[10px] font-mono text-muted-foreground/60">
            <div className="flex items-center gap-1">
              <Shield size={10} /> AES-256 Compatible
            </div>
            <div className="flex items-center gap-1">
              <Zap size={10} /> Low Latency
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Character Count
              </Label>
              <span className="text-2xl font-mono font-bold text-primary">{length}</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(val) => setLength(val[0])}
              max={64}
              min={6}
              step={1}
              className="py-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ControlOption
              id="upper"
              label="Uppercase (A-Z)"
              checked={includeUppercase}
              onChange={setIncludeUppercase}
            />
            <ControlOption
              id="lower"
              label="Lowercase (a-z)"
              checked={includeLowercase}
              onChange={setIncludeLowercase}
            />
            <ControlOption id="numbers" label="Numbers (0-9)" checked={includeNumbers} onChange={setIncludeNumbers} />
            <ControlOption id="symbols" label="Symbols (!@#$)" checked={includeSymbols} onChange={setIncludeSymbols} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ControlOption({
  id,
  label,
  checked,
  onChange,
}: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
        checked ? "border-primary/40 bg-primary/5" : "border-transparent bg-secondary/50 hover:bg-secondary",
      )}
      onClick={() => onChange(!checked)}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(!!v)} className="rounded-full h-5 w-5" />
      <Label htmlFor={id} className="text-sm font-medium leading-none cursor-pointer flex-1">
        {label}
      </Label>
      {checked && <Check size={14} className="text-primary" />}
    </div>
  )
}

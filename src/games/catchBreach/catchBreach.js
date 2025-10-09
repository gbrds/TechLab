export default class CatchTheBreach {
    constructor({ onBreachStart, onBreachResolved, onBreachMissed, onTick, onGameOver }) {
        this.gridSize = [3, 2]
        this.totalTime = 60
        this.breachDuration = 3000 // shorter reaction window
        this.minInterval = 1000
        this.maxInterval = 2500
        this.timeLeft = this.totalTime

        this.isRunning = false
        this.activeBreaches = new Map() // can hold multiple breaches
        this.timers = {}

        this.totalSpawned = 0
        this.totalResolved = 0
        this.totalMissed = 0

        this.cb = { onBreachStart, onBreachResolved, onBreachMissed, onTick, onGameOver }
    }

    startGame() {
        this.stopGame()
        this.resetStats()

        this.isRunning = true
        this.cb.onTick?.(this.timeLeft)

        this.timers.tick = setInterval(() => {
            this.timeLeft--
            this.cb.onTick?.(this.timeLeft)
            if (this.timeLeft <= 0) this.endGame()
        }, 1000)

        this.scheduleNextBreach()
    }

    resetStats() {
        this.timeLeft = this.totalTime
        this.totalSpawned = 0
        this.totalResolved = 0
        this.totalMissed = 0
        this.activeBreaches.clear()
    }

    scheduleNextBreach() {
        if (!this.isRunning) return
        const delay = this.random(this.minInterval, this.maxInterval)
        this.timers.spawn = setTimeout(() => this.spawnBreach(), delay)
    }

    spawnBreach() {
        if (!this.isRunning) return

        const nodeIndex = this.random(0, 5)
        const breachId = this.genId()

        this.totalSpawned++
        const breach = { id: breachId, nodeIndex, isActive: true }
        this.activeBreaches.set(breachId, breach)

        this.cb.onBreachStart?.({ nodeIndex, breachId })

        // Miss handler
        this.timers[breachId] = setTimeout(() => this.missBreach(breachId), this.breachDuration)

        // Keep spawning continuously
        this.scheduleNextBreach()
    }

    clickNode(nodeIndex) {
        if (!this.isRunning) return
        const breachEntry = [...this.activeBreaches.values()].find(
            b => b.nodeIndex === nodeIndex && b.isActive
        )
        if (!breachEntry) return

        breachEntry.isActive = false
        clearTimeout(this.timers[breachEntry.id])
        this.totalResolved++
        this.cb.onBreachResolved?.({ nodeIndex, breachId: breachEntry.id })

        // Remove after animation delay
        setTimeout(() => this.activeBreaches.delete(breachEntry.id), 300)
    }

    missBreach(breachId) {
        const breach = this.activeBreaches.get(breachId)
        if (!breach || !breach.isActive) return

        breach.isActive = false
        this.totalMissed++
        this.cb.onBreachMissed?.({ nodeIndex: breach.nodeIndex, breachId })

        // Remove visually after a delay
        setTimeout(() => this.activeBreaches.delete(breachId), 400)
    }

    endGame() {
        this.isRunning = false
        Object.values(this.timers).forEach(clearTimeout)

        const ratio = this.totalSpawned > 0
            ? (this.totalResolved / this.totalSpawned) * 5
            : 0

        this.cb.onGameOver?.({
            totalSpawned: this.totalSpawned,
            totalResolved: this.totalResolved,
            totalMissed: this.totalMissed,
            finalScore: Math.round(ratio) // round to full number
        })
    }

    stopGame() {
        this.isRunning = false
        Object.values(this.timers).forEach(clearTimeout)
        this.activeBreaches.clear()
    }

    genId() {
        return Math.random().toString(36).substring(2, 9)
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}
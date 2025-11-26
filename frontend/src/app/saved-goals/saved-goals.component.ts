import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-saved-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-goals.component.html',
  styleUrls: ['./saved-goals.component.css']
})
export class SavedGoalsComponent implements OnInit {

  goals: any[] = [];
  loading = true;

  constructor(
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals() {
    this.goalService.getGoals().subscribe({
      next: (res) => {
        this.goals = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert("Error fetching goals.");
      }
    });
  }

  deleteGoal(id: string) {
    if (!confirm("Are you sure you want to delete this goal?")) return;

    this.goalService.deleteGoal(id).subscribe({
      next: () => {
        this.goals = this.goals.filter(g => g._id !== id);
      },
      error: () => {
        alert("Error deleting goal.");
      }
    });
  }
}
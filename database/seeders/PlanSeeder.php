<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'Pro',
            'description' => [
                'Unlimited Events',
                'Unlimited Booth Categories',
                'Unlimited Tenants',
                'Featured on Tokoku Landing Page',
                'Comprehensive Sales Analytics',
            ],
            'price' => 199000,
            'duration_days' => 30,
            'midtrans_plan_id' => null,
        ]);
    }
}
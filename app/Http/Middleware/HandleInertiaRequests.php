<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Symfony\Component\Process\Process;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $disk['total'] = round(((disk_total_space('/')) / 1024 / 1024 / 1024), 2);
        $disk['free'] = round(((disk_free_space('/')) / 1024 / 1024 / 1024), 2);
        $disk['used'] = round(($disk['total'] - $disk['free']), 2);
        $disk['usedPercent'] = round(($disk['total'] - $disk['free']) / $disk['total'] * 100, 2);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'status' => fn () => $request->session()->get('status'),
            'disk' => fn () => $disk,
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CatalogueController extends Controller
{
    public function index()
    {
        $products = Product::all(['id', 'name', 'image', 'price', 'created_at']);

        return Inertia::render('Catalogue/Index', [
            'products' => $products,
        ]);
    }

    public function show(string $id)
    {
        $product = Product::find($id);

        return Inertia::render('Catalogue/Show', ['product' => $product]);
    }

    public function showImage(string $id)
    {
        $product = Product::find($id);

        return Inertia::render('Catalogue/ShowImage', ['id' => $product['id'], 'image' => $product['image']]);
    }
}

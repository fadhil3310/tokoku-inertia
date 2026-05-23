<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CatalogueController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $products = null;

        if ($category == '') {
            $products = Product::where('name', 'like', "%{$search}%")->paginate(10);
        } else {
            $products = Product::where('category', $category)->where('name', 'like', "%{$search}%")->paginate(10);
        }

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

<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all(['id', 'name', 'description', 'price', 'created_at']);

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);

    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'category'    => 'required|in:sticker,poster,print,accessory,food,beverage,clothing,undefined',
            'sku'         => 'required|string|unique:products,sku|max:100',
            'stock'       => 'required|integer|min:0',
            'image'       => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status'      => 'required|in:draft,pending,published,archived,inactive',
            'visibility'  => 'required|in:private,public',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $validated['id'] = Str::uuid();

        Product::create($validated);

        Inertia::flash([
            'status' => 'success',
            'message' => 'Product created successfully'
        ]);

        return redirect()->route('products.index');
    }

    public function show(Product $product)
    {
        $hasImage = Storage::disk('public')->exists($product->image);

        return Inertia::render('Products/Show', ['product' => $product, 'hasImage' => $hasImage]);
    }

    public function edit(Product $product)
    {
        $hasImage = Storage::disk('public')->exists($product->image);

        return Inertia::render('Products/Edit', ['product' => $product, 'hasImage' => $hasImage]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'category'    => 'required|in:sticker,poster,print,accessory,food,beverage,clothing,undefined',
            'sku'         => 'required|string|unique:products,sku,' . $product->id . ',id|max:100',
            'stock'       => 'required|integer|min:0',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status'      => 'required|in:draft,pending,published,archived,inactive',
            'visibility'  => 'required|in:private,public',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        } else {
            $validated['image'] = $product->image;
        }

        $product->update($validated);

        Inertia::flash([
            'status' => 'success',
            'message' => 'Product updated successfully'
        ]);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        Inertia::flash([
            'status' => 'success',
            'message' => 'Product \''.$product->name.'\' deleted successfully.',
        ]);

        return redirect()->route('products.index');
    }
}
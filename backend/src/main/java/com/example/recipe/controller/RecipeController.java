package com.example.recipe.controller;

import com.example.recipe.model.Recipe;
import com.example.recipe.repository.RecipeRepository;
import com.example.recipe.exception.RecipeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository repo;

    // Get all recipes
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return repo.findAll();
    }

    // Add new recipe
    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return repo.save(recipe);
    }

    // Delete a recipe
    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new RecipeNotFoundException(id);
        }
        repo.deleteById(id);
    }

    // Update a recipe
    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe updatedRecipe) {
        Recipe recipe = repo.findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));

        recipe.setName(updatedRecipe.getName());
        recipe.setChef(updatedRecipe.getChef());
        recipe.setIngredients(updatedRecipe.getIngredients());
        recipe.setInstructions(updatedRecipe.getInstructions());

        return repo.save(recipe);
    }
}
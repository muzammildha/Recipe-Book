#! usr/bin/env node 

import inquirer from "inquirer"
import chalk from "chalk"

type Recipe ={
    name : string ;
    ingredients: string ;
    instruction : string
}

let recipes :Recipe [] = [] ;

async function main() {
    const answers = await inquirer.prompt(
        [
            {
                type :"list",
                name : "Action",
                message : "What Do You Want to do",
                choices : ["Add Recipe","Remove Recipe","View Recipes","Search Recipe","Exit"]
            }
        ]
    )
    switch(answers.Action){

        case "Add Recipe" :
            const NewRecipe = await inquirer.prompt(
                [
                    {
                        type : 'input',
                        name : "Name",
                        message : "Enter Your Recipe Name"

                    },
                    {
                        type : "input",
                        name : "Ingredients",
                        message : "Enter your Recipes ingredients"

                    },
                    {
                        type : "input",
                        name : "Instructions",
                        message : "Add instruction for your recipe"

                    }
                ]
            );
            recipes.push({name : NewRecipe.Name ,ingredients : NewRecipe.Ingredients , instruction : NewRecipe.Instructions});
            console.log(chalk.bold.yellowBright("New Recipe Added"));
            break;

            case "Remove Recipe" :
                const { deleteName } = await inquirer.prompt(
                    [
                    
                    {

                      type: 'input',

                      name: 'deleteName',
                      
                      message: 'Enter the recipe name to delete:' 
                      
                    }
                  ]
                );
                  const initialLength = recipes.length;
                  
                  recipes = recipes.filter(recipe => recipe.name.toLowerCase() !== deleteName.toLowerCase());
                  
                  if (recipes.length < initialLength) {
                  
                    console.log(chalk.green('Recipe deleted!'));
                  
                } else {
                
                    console.log(chalk.red('Recipe not found.'));
                
                }
                
                break;

                case "View Recipes" :

                    if (recipes.length === 0) {
                     
                        console.log(chalk.yellow('No recipes found.'));
                     
                    } else {
                    
                        recipes.forEach((recipe, index) => {
                    
                            console.log(chalk.blue(`\nRecipe #${index + 1}`));
                    
                            console.log(`Name: ${chalk.bold(recipe.name)}`);
                    
                            console.log(`Ingredients: ${recipe.ingredients}`);
                    
                            console.log(`Instructions: ${recipe.instruction}`);
                    
                        });
                    
                    }
                      break;

                      case "Search Recipe":
                        
                      const { searchName } = await inquirer.prompt([
                      
                        { type: 'input', name: 'searchName', message: 'Enter the recipe name to search:' },
                      
                    ]);
                    
                    const foundRecipe = recipes.find(recipe => recipe.name.toLowerCase() === searchName.toLowerCase());
                    
                    if (foundRecipe) {
                    
                        console.log(chalk.blue(`\nFound Recipe:`));
                    
                        console.log(`Name: ${chalk.bold(foundRecipe.name)}`);
                    
                        console.log(`Ingredients: ${foundRecipe.ingredients}`);
                          
                        console.log(`Instructions: ${foundRecipe.instruction}`);
                        
                    } else {
                    
                        console.log(chalk.red('Recipe not found.'));
                    
                    }
                    
                    break;

                    case "Exit":
                        return;
                      
            
    } 
    
    main()

}

main()
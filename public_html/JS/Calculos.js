let inputText = document.getElementById("inputText");

//funcion que agrega un caracter que se pase por los parametros y se utilzia para sumar al input
//param x
//return void
function btn(x)
{
    this.inputText.value +=x; 
}

//funcion que borra el ultimo caracter del valor dentro del input
//param void
//return void
function removeLast()
{
    let newStr = ""+this.inputText.value;
    newStr = newStr.substring(0, newStr.length-1); //substring corta una cadena de texto de inicio en este caso 0 hasta el largo de la cadena
    this.inputText.value=newStr;
}

//funcion que borra todo el contenido del imput
//param void
//return void
function removeAll()
{
    this.inputText.value=null;
}

//funcion que borra todo el contenido de los resultados
//param void
//return void
function removeResult()
{
    document.getElementById("result").innerHTML="";
}

//funcion que calcula el resultado de la operacion
//param void
//return void
function calculate()
{
    //variable que almacena la antigua cadena de texto que roviene del imput
    let oldStr = ""+this.inputText.value;
    
    //oldStr = deleteStr(oldStr);
    
    //this.inputText.value=oldStr;    
    //variable que almacena nuevas cadenas de texto que se transformaran en float
    let newStr1 ="";
    //lista guarda las operaciones matematicas hechas para luego mostrarlas
    let operations = [];
    //lista guarda el resultado de las operaciones anteriores
    let operationsResult = [];
    //lista guarda los numeros float que provendran de newStr1
    let numbers = [];
    //lista guarda simbolos utilizados en la operacion matematica = + - * / 
    let simbols=[];
     
     //revisa si hay un simbolo para cortar la cadena
    let isSimbol = false;
    
    //for que separa los numeros y simbolos y los guarda en una lista
    for(let x=0; x<oldStr.length; x++)
    {
        //si encuentra un simbolo cortara la cadena
       if(oldStr[x]==='*' || oldStr[x]==='/' || oldStr[x]==='-' || oldStr[x]==='+')
       {
           isSimbol=true;
       }
       //si es el final de la cadena guardara 
       else if(x===oldStr.length-1)
       {
           isSimbol=true;
           newStr1+=oldStr[x];
       }
       //mientras no encuentre un simbolo guardara el char en la cadena (numeros)
       else
       {
           newStr1+=oldStr[x];
       }
       //si es un simbolo y el largo de la cadena no es el final guardara en la lista de simbolos
       if(isSimbol===true && x!==oldStr.length-1)
       {
           simbols.push(oldStr[x]);
       }
       //si es un simbolo corta la cadena newStr1 y se parsea a float luego se vacia
       if(isSimbol===true)
       {
           numbers.push(parseFloat(newStr1));
           newStr1="";
           isSimbol=false;
       }
    }
    //for que prioriza lamultiplicacion y divicion de izquierda a derecha
    for(let i=0; i<simbols.length;)
    {
        //si encuentra una multiplicacion o division comenzara a calcular partiendo por la primera que encuentre
        if(simbols[i]==="*" || simbols[i]==="/")
        {
            //si es multiplicacion
            if(simbols[i]==='*')
            {
                operations.push(""+numbers[i]+" * "+numbers[i+1]); //guardara operacion matematica actual (multiplicacion)
                numbers[i]= numbers[i] * numbers[i+1]; // guardara el resultado de todas las operaciones hechas y el final
                operationsResult.push(numbers[i]); //guardara el resultado de la operacion matematica actual
                numbers=deleteItem(numbers,i+1);//elimina el numero sobrante de la lista ya que se termino de calcular
                simbols=deleteItem(simbols,i);//elimina el simbolo de la operacion ya que se termino de calcular
                i=0;//resetea el for con la lista nueva
            }
            else if(simbols[i]==='/')
            {
                operations.push(""+numbers[i]+" / "+numbers[i+1]);//guardara operacion matematica actual (division)
                numbers[i]= numbers[i] / numbers[i+1];// guardara el resultado de todas las operaciones hechas y el final
                operationsResult.push(numbers[i]);//guardara el resultado de la operacion matematica actual
                numbers=deleteItem(numbers,i+1);//elimina el numero sobrante de la lista ya que se termino de calcular
                simbols=deleteItem(simbols,i);//elimina el simbolo de la operacion ya que se termino de calcular
                i=0;//resetea el for con la lista nueva
            }
        }
        //sino encuentra multiplicacion o division seguira sumando al for para avanzar
        else
        {
            i++;
        }

    }
    
    //for que suma y resta de izquierda a derecha
    for(let i=0; i<simbols.length;)
    {
        if(simbols[i]==="+" || simbols[i]==="-")
        {

            if(simbols[i]==='+')
            {
                operations.push(""+numbers[i]+" + "+numbers[i+1]);//guardara operacion matematica actual (suma)
                numbers[i]= numbers[i] + numbers[i+1];// guardara el resultado de todas las operaciones hechas y el final
                operationsResult.push(numbers[i]);//guardara el resultado de la operacion matematica actual
                numbers=deleteItem(numbers,i+1);//elimina el numero sobrante de la lista ya que se termino de calcular
                simbols=deleteItem(simbols,i);//elimina el simbolo de la operacion ya que se termino de calcular
                i=0;//resetea el for con la lista nueva
            }
            else if(simbols[i]==='-')
            {
                operations.push(""+numbers[i]+" - "+numbers[i+1]);//guardara operacion matematica actual (resta)
                numbers[i]= numbers[i] - numbers[i+1];// guardara el resultado de todas las operaciones hechas y el final
                operationsResult.push(numbers[i]);//guardara el resultado de la operacion matematica actual
                numbers=deleteItem(numbers,i+1);//elimina el numero sobrante de la lista ya que se termino de calcular
                simbols=deleteItem(simbols,i);//elimina el simbolo de la operacion ya que se termino de calcular
                i=0;//resetea el for con la lista nueva
            }
        }
        //sino encuentra ni suma ni resta seguira sumando al for para avanzar
        else
        {
            i++;
        }
    }
    //si no esta vacio el calculo se imprimira
    if(numbers[0]!==undefined)
    {
        document.getElementById("result").innerHTML +="Operacion = <br>"; //imprime el titulo operacion
        //for que imprime en el documento todas las operaciones hechas para llegar al resultado
        for(let i =0;i<operations.length;i++)
        {
            document.getElementById("result").innerHTML += operations[i]+" = "+operationsResult[i]+"<br>"; //imprime todas las operaciones mas el resultado
        }
        document.getElementById("result").innerHTML +="resultado final = "+ numbers[0]+"<br><br>"; //imprime el resultado final del calculo
    }
}

//funcion que elimina un item de la lista indicando la lista y el indice devolvera una nueva listamas corta
//param index
//retunr lista[]
function deleteItem(list,index)
{
    let newList = [];
    for(let i =0;i<list.length;i++)
    {
        if(i!==index)
        {
            newList.push(list[i]);
        }   
    }
    
    return newList;
}

//Funcion que agrega un zero a los numeros negativos para arreglarlos
//param void
//return void
function fixNegativeN()
{
    let cadena = this.inputText.value;
    let strList = ["0","1","2","3","4","5","6","7","8","9"];
    let newCadena="";
    let isNegative = false;
    let isNumber = false;
    
    for(let i = 0; i<cadena.length;i++)
    {
        if(cadena[i]==='-')
        {
            if(i>0)
            {
                if(isNumber(i-1))
                {
                    
                }
            }
            else
            {
                newCadena += 0;
                for(let x = 0; x<cadena.length;x++)
                {
                    newCadena  += cadena[x];
                }
            }
            for(let x = 0; x<strList.length-1;x++)
            {
                
            }
        }
    }
}

//funcion que borra los simbolos o letras no permitidos en la calculadora llamada desde el input y no desde button
//param void
//return void
function deleteStr()
{
    let cadena = this.inputText.value;
    let newStr = "";
    let strList = ["0","1","2","3","4","5","6","7","8","9",".","+","-","*","/"];
    
    for(let i = 0; i<cadena.length;i++)
    {
        for(let x = 0; x<strList.length;x++)
        {
            if(cadena[i]===strList[x])
            {
                newStr+=""+cadena[i];
                break;
            }
        }
    }
    
    this.inputText.value= newStr;
}

function isNumber(num)
{
    let strList = ["0","1","2","3","4","5","6","7","8","9"];
    
    for(let i = 0; i<strList.length;i++)
    {
        if(num===strList[i])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
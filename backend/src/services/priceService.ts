import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const URL = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`

const Markup_percent=2.5

export async function getLiveUSDCPrice(){
    try{
        const response = await axios.get(URL)
        const data = response.data
        const usdcPrice = data.conversion_rates.INR
        const markupPrice = usdcPrice + (usdcPrice * Markup_percent / 100)
        console.log(markupPrice)
        return {
            success:true,
            rawRate:usdcPrice,
            markup:markupPrice,
            finalRate:parseFloat(markupPrice.toFixed(2))
        }
    }
    catch(error){
        console.log(error)
        return {
            success:false,
            finalRate:93,
            isFallback:true
        }
    }
}

// if (require.main === module) {
//     // console.log("API KEY:", process.env.EXCHANGE_RATE_API_KEY);

//   getliveUSDCPrice();
// }

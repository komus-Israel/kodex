import { get, reject, groupBy } from "lodash";
import { useSelector } from "react-redux";
import decorateOrder, { decorateOrderBookSaleType} from "./decorateOrder";


const OrderBook=()=>{

    

    const createdOrders = useSelector(
        state => get(state, 'loadEventsReducer.createdOrders', [])
    )


    const filledOrders = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    const  cancelledOrders = useSelector(
        state => get(state, 'loadEventsReducer.cancelledOrders', [])
    )

    const openOrders = reject(createdOrders, (order)=>{
        const filled = filledOrders.some((filledOrder)=>filledOrder._id === order._id)
        const cancelled = cancelledOrders.some((cancelledOrder) => cancelledOrder._id === order._id)

        return filled || cancelled
    })


    const preprocessOrderBook=(order)=>{
        const decoratedOpenOrders = decorateOrder(order)
        const orderBook = decorateOrderBookSaleType(decoratedOpenOrders)

        return orderBook
    }    
    

    const preprocessedOrderBook = preprocessOrderBook(openOrders) // apply the decoration to the order book
   
    const groupOrderIntoBuyAndSell  = groupBy(preprocessedOrderBook, 'orderType') // group the orders buy their order type which is "buy" and "sell"

    const sellOrder = get(groupOrderIntoBuyAndSell, 'Sell', []) // get the buy orders from the object
    const buyOrder = get(groupOrderIntoBuyAndSell, 'Buy', [])   // get the sell orders from the object

    const sortedSellOrderPrice = sellOrder.sort((a,b)=>b.tokenPrice - a.tokenPrice)
    const sortedBuyOrderPrice = buyOrder.sort((a,b)=>b.tokenPrice - a.tokenPrice)

    const orderBook = {

        ...groupOrderIntoBuyAndSell,
        sellOrder,
        buyOrder
    }

    console.log(orderBook)

    
   
    
    return(
        <div className="order-book">
            <p className="cont-header">Order Book</p>
            <div className="dex-content">

                <table>
                    <tbody>
                        <OrderSale orderType={orderBook.buyOrder} name="buy"/>
                        <Divider />
                        <OrderSale orderType={orderBook.sellOrder} name="sell"/>
                    </tbody>
                </table>

                {/*sell order 

                divider

                buy order*/}

                
                
            </div>
            
        </div>
    )
}

const OrderSale=({orderType, name})=>{
    return(

        orderType.map((order)=> renderOrder(order))
        
    )
}

const renderOrder=(order)=>{
    return (

        <tr key={order._id}>
            <td>{order.tokenAmount}</td>
            <td>{order.tokenPrice}</td>
            <td>{order.etherAmount}</td>
        </tr>
        
       

    )
}

const Divider=()=>{
    return (
        <tr>
            <td>KOM</td>
            <td>Price</td>
            <td>ETH</td>
        </tr>
    )
}

export default OrderBook
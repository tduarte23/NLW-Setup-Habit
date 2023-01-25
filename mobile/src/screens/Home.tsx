import { View , Text, ScrollView,Alert} from "react-native";
import { useEffect, useState } from "react";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useNavigation } from "@react-navigation/native";

import { api } from "../lib/axios";
import { generatesDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import dayjs from "dayjs";

const weekdays = ["D","S","T","Q","Q","S","S"];
const datesFromYearStart = generatesDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill =minimumSummaryDatesSizes - datesFromYearStart.length


type summaryProps = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function Home(){
    const [oading,setLoading] = useState(true);
    const [summary,setSummary] = useState<summaryProps | null>(null)
    const {navigate} = useNavigation()

    async function fetchData(){
        try {
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data);
        } catch (error) {
            Alert.alert('Ops','Não foi possivel carregar o sumário de Habitos')
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    })

    if(Loading){
        return(<Loading />)
    }
    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {
                        weekdays.map((weekday, i)=>(
                            <Text
                            key={`${weekday}-${i}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{width: DAY_SIZE}}
                            >
                                {weekday}
                            </Text>
                        ))
                    
                }
            </View>
            <ScrollView
            showsVerticalScrollIndicator={false}>
                {
                    summary &&
            <View className="flex-row flex-wrap">
            {
                datesFromYearStart.map(date =>{
                    const dayWithHabits = summary.find(day => {
                        return dayjs(date).isSame(day.date,'day')
                    })
                    return(
                    <HabitDay
                    key={date.toISOString()}
                    date={date}
                    amountOfHabits={dayWithHabits?.amount}
                    amountCompleted={dayWithHabits?.completed}
                    onPress={() => navigate('habit',{date: date.toISOString()})}
                    />
                )})
            }
            {
                amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill})
                .map((_,index)=>(
                    <View className="bg-zinc-900 opacity-40 rounded-lg border-2 m-1 border-zinc-800"
                    style={{width: DAY_SIZE, height: DAY_SIZE}}
                    

                    />
                ))
            }    
            </View>
}
            </ScrollView> 
        </View>
        
    )
}
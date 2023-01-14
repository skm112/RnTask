import { StyleSheet, View, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../apis'
import { useTheme, Card, Text, Appbar } from 'react-native-paper'
const HomeScreen = () => {
    const { colors } = useTheme()
    const [ data, setData ] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const resp = await fetchData()
            if (resp) {
                setData(resp)
            }
        }
        getApi()
    }, [])


    const renderItem = ({ item, index }) => {
        return <Card style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <Card.Title title={item?.title} />
            <Card.Content>
                <Text variant="titleLarge">{item?.body}</Text>
            </Card.Content>
        </Card>
    }

    return (
        <>
            <StatusBar animated={true} barStyle="default" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary }}>
                <Appbar.Content titleStyle={{ color: colors.background }} title="Home Screen" />
            </Appbar.Header>
            <FlatList
                data={data}
                contentContainerStyle={{ backgroundColor: colors.background }}
                keyExtractor={(item, index) => `${item.id}-index-${index}`}
                renderItem={renderItem}
            />
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
# -*- coding: utf-8 -*-
import os
import selenium
from selenium import webdriver

driver =webdriver.Chrome('/usr/local/bin/chromedriver')
driver.get('http://localhost:4202/signup')
driver.find_element_by_name('fname').send_keys('Bunlong')
driver.find_element_by_name('lname').send_keys('Heng')
driver.find_element_by_name('email').send_keys('sybunlongheng+27@gmail.com')
driver.find_element_by_name('username').send_keys('bheng27')
driver.find_element_by_name('password').send_keys('qqq')
driver.find_element_by_name('cpassword').send_keys('qqq')
driver.find_element_by_id('checkbox-signup').click()
# driver.find_element_by_xpath('//button[@type="submit"]').click()


